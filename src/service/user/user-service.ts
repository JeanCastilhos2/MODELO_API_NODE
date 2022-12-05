import { inviteEmailContent } from "@messages/email/content"
import { User } from "../../models/Entity/User"
//import { EmailService } from "@service/email/EmailService"
import { HttpError, HttpStatusCode } from "../HttpError"
import { UserRequest } from "./user-request"
import md5 from "md5"

export const userService = (request) => {

    const createUser = async () => {
        const { name, email, type, flag, password, decodedPassword } =
            UserRequest(request).getUserCreate()
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
            UserRequest(request).getUserUpdate()
        
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
