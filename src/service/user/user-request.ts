import { UserRegistrationStatus } from "../Flags"
import { HttpError, HttpStatusCode } from "../HttpStatus"
import { Message } from "../../messages/index"
import { Roles } from "../Roles"
import { isLocal } from "../../utils/isLocal"
import md5 from "md5"

export const UserRequest = ({ params, body, query }) => {
    const { USER_DISABLED, USER_ENABLED } =
        UserRegistrationStatus
    const { name, email, password, type, flag } = body
    const { id } = params

    const encryptPassword = (password) => md5(password)

    const generatePassword = () => {
        const getPassword = isLocal()
            ? "123"
            : password
        return {
            encryptedPassword: encryptPassword(getPassword),
            decodedPassword: getPassword,
        }
    }

    const isValidType = () => {
        const { ADMIN, USER } = Roles
        const types = [ADMIN, USER]
        return type && types.includes(type)
    }

    const isRequired = () => {
        return name && email && type
    }

    const isValidBodyForCreateUser = () => {
        if (isRequired() && isValidType()) {
            return { ...body }
        }
        throw new HttpError(Message.INCOMPLETE_REQUIREMENTS, HttpStatusCode.BAD_REQUEST)
    }
    const getUserForCreate = () => {
        const user = isValidBodyForCreateUser()
        const passwords = generatePassword()
        return {
            ...user,
            password: passwords.encryptedPassword,
            decodedPassword: passwords.decodedPassword,
            flag: USER_ENABLED,
        }
    }

    const getUserForUpdate = () => {
        const user = {
            ...body,
            _id: id
        }
        return user
    }
    const getUserForDelete = () => {
        const user = {
            ...body,
            _id: id
        }
        return user

    }

    return {
        getUserForCreate,
        getUserForUpdate,
        getUserForDelete
    }
}
