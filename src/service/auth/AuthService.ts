import { HttpError, HttpStatusCode } from "../HttpStatus"
import { userService } from "../user/user-service"
import md5 from "md5"

const jwt = require("jsonwebtoken")

export const createAccessToken = async (request) => {
  const { SECRET } = process.env
  const passwordUser = request.password
  let auth = true

  const user = await userService(request).findUserByEmail()

  if (!user || user.password !== md5(passwordUser)) {
    throw new HttpError("Unauthorized", HttpStatusCode.UNAUTHORIZED)
  }

  const payload = {
    name: user.name,
    email: user.email,
    role: user.type,
    id: user.id,
  }
  const accessToken = jwt.sign(payload, SECRET, { expiresIn: "1d" })

  return {
    auth,
    accessToken,
    user: payload,
  }
}

export const getRoleToken = (authorization = "") => {
  const [, token] = authorization.split(" ")
  const { role = null } = jwt.decode(token)
  return role
}

export const validateAccessToken = (authorization = "", roles = []) => {
  const { SECRET } = process.env
  const [, token] = authorization.split(" ")
  const role = getRoleToken(authorization)

  if (!role) {
    return false
  }

  const isVerified = jwt.verify(token, SECRET, (err) => {
    return !err
  })

  return isVerified && roles.includes(role)
}


