import { List } from "../../models/List"
import { User } from "../../models/User"
import { HttpError, HttpStatusCode } from "../HttpStatus"
import { getSkip } from "../../utils/getSkip"
import { Message } from "../../messages/index"

export const listService = (request) => {

    const createList = async () => {
        const { user_id, title_id, title_type, rate } = request.body
        const createList = List.create({
            user_id,
            title_id,
            title_type,
            rate
        })

        return createList
    }

    const updateList = async () => {
        const { _id, rate } = request.body
        let listForUpdate = await List.findById({ _id })
        if (!listForUpdate) {
            throw new HttpError(
                `List not found with: ${_id}`,
                HttpStatusCode.BAD_REQUEST
            )
        }
        listForUpdate.rate = rate
        User.findByIdAndUpdate(_id, listForUpdate)

        return Message.LIST_UPDATE
    }

    const deleteList = async () => {
        const { _id } = request.params
        let listForDelete = await List.findById({ _id })
        if (!listForDelete) {
            throw new HttpError(
                `List not found with: ${_id}`,
                HttpStatusCode.BAD_REQUEST
            )
        }
        listForDelete.remove()

        return Message.LIST_REMOVED
    }

    const getListByUser = async () => {
        const { user_id } = request.params
        console.log(user_id)
        const list = await List.find(user_id)
        console.log(list)
        return {
            Lists: list
        }
    }

    const getAllList = async () => {
        const {
            page = 0,
            limit = 5,
        } = request.query

        const list = await List.find()
            .limit(limit)
            .skip(getSkip(page - 1, limit))

        return {
            Lists: list
        }
    }

    return {
        createList,
        updateList,
        deleteList,
        getListByUser,
        getAllList
    }
}
