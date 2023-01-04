import { httpResponseHandler } from "../../controllers/HttpResponseHandler"
import { createAccessToken, validateAccessToken } from "../../service/auth/AuthService"

export const generateAccessToken = async (request, response) => {
  try {
    const tokenPayload = await createAccessToken(request)
    return response.json(tokenPayload)
  } catch (error) {
    return httpResponseHandler().createErrorResponse(error, response)
  }
}

export const verifyAccessToken = (roles) => (request, response, next) => {
  const { authorization } = request.headers

  if (validateAccessToken(authorization, roles)) {
    return next()
  }
  return response.sendStatus(401)
}

