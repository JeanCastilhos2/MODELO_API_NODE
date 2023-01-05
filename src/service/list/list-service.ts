import { List } from "../../models/List"
import { User } from "../../models/User"
import { HttpError, HttpStatusCode } from "../HttpStatus"
import { ListRequest } from "./list-request"
import md5 from "md5"
import { getSkip } from "../../utils/getSkip"

export const userService = (request) => {

    const createList = async () => {
        const { user_id, title_id, title_type, rate } =
            ListRequest(request).getListForCreate()

        const createList = List.create({
            user_id,
            title_id,
            title_type,
            rate
        })

        return createList
    }

    const updateList = async () => {
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
