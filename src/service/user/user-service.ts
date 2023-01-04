import { inviteEmailContent } from "@messages/email/content"
import { User } from "../../models/Entity/User"
//import { EmailService } from "@service/email/EmailService"
import { HttpError, HttpStatusCode } from "../HttpStatus"
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
        const createUser = User.create({
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

        return { ...createUser, name, email, password: decodedPassword }
    }

    const updateUser = async () => {
        const { name, email, flag, password, _id } =
            UserRequest(request).getUserForUpdate()
        console.log(name.email)
        let userForUpdate = await User.findById({ _id })
        console.log(userForUpdate)
        if (!userForUpdate.email) {
            throw new HttpError(
                `User not found with: ${_id}`,
                HttpStatusCode.NOT_FOUND
            )
        }
        
        if (name) {
            userForUpdate.name = name
        }
        if (email) {
            userForUpdate.email = email
        }
        if (password) {
            userForUpdate.password = md5(password)
        }
        if (flag) {
            userForUpdate.flag = flag
        }

        const updateUser = User.findByIdAndUpdate(_id, userForUpdate)

        return updateUser
    }

    const deleteUser = async () => {
        const { _id } =
            UserRequest(request).getUserForDelete()

        let userForDelete = await User.findById({ _id })
        if (!userForDelete) {
            throw new HttpError(
                `User not found with: ${_id}`,
                HttpStatusCode.BAD_REQUEST
            )
        }
        userForDelete.remove()

        return { name: userForDelete.name, email: userForDelete.email }
    }

    const findUserByEmail = async () => {
        const email = request.email
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

    const getUserById = async () => {
        const _id = request.params.id
        const result = await User.findOne({ _id })
        return result
    }

    const getUserByEmail = async () => {
        const email = request.body.email
        const result = await User.findOne({ email })
        return result
    }

    return {
        createUser,
        updateUser,
        deleteUser,
        findUserByEmail,
        getAllUser,
        getUserById,
        getUserByEmail
    }
}
