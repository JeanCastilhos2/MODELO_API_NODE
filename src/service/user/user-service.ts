import { inviteEmailContent } from "@messages/email/content"
import { User } from "../../models/Entity/User"
//import { EmailService } from "@service/email/EmailService"
import { HttpError, HttpStatusCode } from "../HttpError"

import { UserRequest } from "./user-request"
import md5 from "md5"

export const userService = (request) => {

    const createUser = async () => {
        const { name, email, type, flag, role, password, decodedPassword } =
            UserRequest(request).firstLogin()
        const findUser = await User.findOne({ where: { email } })
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
            role,
            password,
        })

        return user
    }

    const updateUser = async () => {
        const { name, email, telephone, type, flag, password, id } =
            UserRequest(request).getUserUpdate()

        let userEntity = await User.findOne({ where: { id } })
        if (!userEntity) {
            throw new HttpError(
                `User not found with: ${id}`,
                HttpStatusCode.BAD_REQUEST
            )
        }

        if (password) {
            userEntity.password = md5(password)
        }
        if (name) {
            userEntity.name = name
        }
        if (email) {
            userEntity.email = email
        }
        if (type) {
            userEntity.type = type
        }
        if (flag) {
            userEntity.flag = flag
        }

        return await userEntity
    }

    const getAllUser = async () => {
        return await User.find({
            select: [
                "id",
                "name",
                "email",
                "telephone",
                "flag",
                "role",
                "createdAt",
                "updatedAt",
            ],
        })
    }

    return {
        createUser,
        updateUser,
        getAllUser,
    }
}
