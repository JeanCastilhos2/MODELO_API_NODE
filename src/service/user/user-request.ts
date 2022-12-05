import { UserRegistrationStatus } from "../Flags"
import { HttpError, HttpStatusCode } from "../HttpError"
import { Message } from "../../messages/index"
import { Roles } from "../Roles"
import { isLocal } from "../../utils/isLocal"
import md5 from "md5"

export const UserRequest = ({ params, body, query }) => {
    const { USER_DISABLED, USER_ENABLED } =
        UserRegistrationStatus
    const { name, email, password, type, flag } = body
    const { id } = params

    const isValidType = () => {
        const { ADMIN, USER } = Roles
        const types = [ADMIN, USER]
        return type && types.includes(type)
    }

    const isRequired = () => {
        return name && email && type && !flag
    }

    const encryptPassword = (password) => md5(password)

    const generatePassword = () => {
        const randomPassword = isLocal()
            ? "123"
            : Math.random().toString(36).slice(-10)
        return {
            encryptedPassword: encryptPassword(randomPassword),
            decodedPassword: randomPassword,
        }
    }

    const isValidBodyForCreateUser = () => {
        if (isRequired() && isValidType()) {
            return { ...body }
        }
        throw new HttpError(Message.CREATE_ERROR, HttpStatusCode.BAD_REQUEST)
    }
    const getUserCreate = () => {
        const user = isValidBodyForCreateUser()
        const passwords = generatePassword()
        return {
            ...user,
            password: passwords.encryptedPassword,
            decodedPassword: passwords.decodedPassword,
            flag: USER_ENABLED,
        }
    }

    const getUserUpdate = () => {
        let user = { ...body }
            user = {
                ...user,
                _id: id
            }
        return user
        }

    return {
        getUserCreate,
        getUserUpdate,
    }
}
