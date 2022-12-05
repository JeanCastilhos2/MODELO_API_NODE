import { inviteEmailContent } from "@messages/email/content"
import { User } from "../../models/Entity/User"
//import { EmailService } from "@service/email/EmailService"
import { HttpError, HttpStatusCode } from "../HttpError"
import { UserRequest } from "./user-request"
import md5 from "md5"
import { getSkip } from "../../utils/getSkip"

export const userService = (request) => {

    const createUser = async () => {
        const { name, email, type, flag, password, decodedPassword } =
            UserRequest(request).getUserForCreate()
        const findUser = await User.findOne({ email })
        if (findUser) {
            throw new HttpError(
                "User already exist in database",
                HttpStatusCode.CONFLICT
            )
        }
        const user = User.create({
            name,
            email,
            type,
            flag,
            password,
        })

        /*  sendEmail(
           {
             name,
             email,
             password: decodedPassword,
           },
           inviteEmailContent
         ) */

        return { ...user, name, email, password: decodedPassword }
    }

    const updateUser = async () => {
        const { name, type, flag, password, _id } =
            UserRequest(request).getUserForUpdate()

        let userForUpdate = await User.findById({ _id })
        if (!userForUpdate.email) {
            throw new HttpError(
                `User not found with: ${_id}`,
                HttpStatusCode.BAD_REQUEST
            )
        }

        if (password) {
            userForUpdate.password = md5(password)
        }
        if (name) {
            userForUpdate.name = name
        }
        if (type) {
            userForUpdate.type = type
        }
        if (flag) {
            userForUpdate.flag = flag
        }

        const updatedUser = userForUpdate.save()

        return updatedUser
    }

    const deleteUser = async () => {
        const {_id } =
            UserRequest(request).getUserForDelete()

        let userForDelete = await User.findById({ _id })
        if (!userForDelete) {
            throw new HttpError(
                `User not found with: ${_id}`,
                HttpStatusCode.BAD_REQUEST
            )
        }
        userForDelete.remove()

        return { name: userForDelete.name, email: userForDelete.email}
    }

    const findUserByEmail = async (email) => {
        const user = await User.findOne({ where: { email } })
        return user
      }

    const getAllUser = async () => {
        const {
            orderBy = "name",
            orientation = "ASC",
            page = 0,
            limit = 2,
        } = request.query

        const list = await User.find()
            .sort(orderBy)
            .limit(limit)
            .skip(getSkip(page - 1, limit))

        return {
            users: list
        }
    }

    return {
        createUser,
        updateUser,
        deleteUser,
        findUserByEmail,
        getAllUser
    }
}
