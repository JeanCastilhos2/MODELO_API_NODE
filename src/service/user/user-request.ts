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

    const isValidFlag = () => {
        const flags = [USER_DISABLED, USER_ENABLED]
        return flag && flags.includes(flag)
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

    const isValidBodyForUpdateUser = () => {
        let user = { ...body }
        if (password) {
            user = {
                ...user,
                id: id
            }
        }

        if (!flag || isValidFlag()) {
            return { ...user }
        }
        throw new HttpError(Message.CREATE_ERROR, HttpStatusCode.BAD_REQUEST)
    }

    const firstLogin = () => {
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
        return isValidBodyForUpdateUser()
    }

    const getUser = () => {
        const user = isValidBodyForUpdateUser()
        return {
            id,
            ...user,
        }
    }

    return {
        firstLogin,
        getUser,
        getUserUpdate,
    }
}
