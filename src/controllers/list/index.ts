import { httpResponseHandler } from "../HttpResponseHandler"
import { Message } from "../../messages/index"
import { listService } from "../../service/user/user-service"
import { HttpStatusCode } from '../../service/HttpStatus'

const httpResponse = httpResponseHandler()

export const createList = async (request, response) => {
  try {
    const result = await listService(request).createList()
    const status = HttpStatusCode.CREATE
    return httpResponseHandler().createSuccessResponse(
      Message.LIST_SAVE,
      result,
      response,
      status
    )
  } catch (error) {
    return httpResponseHandler().createErrorResponse(error, response)
  }
}

export const listUser = async (request, response) => {
  try {
    const result = await listService(request).deleteList()
    const status = HttpStatusCode.OK
    return httpResponse.createSuccessResponse(
      Message.LIST_NOT_REMOVED,
      result,
      response,
      status
    )
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
  }
}

export const getAllList = async (request, response) => {
  try {
    const result = await listService(request).getAllList()
    const status = HttpStatusCode.FOUND
    return httpResponse.createSuccessResponse(
      Message.USER_LIST_FOUND,
      result,
      response,
      status
    )
  } catch (error) {
    return response.status(HttpStatusCode.NOT_FOUND).json(Message.LIST_NOT_FOUND)
  }
}

