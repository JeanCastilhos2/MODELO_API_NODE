import { httpResponseHandler } from "../HttpResponseHandler"
import { Message } from "../../messages/index"
import { userService } from "../../service/user/user-service"
import { HttpStatusCode } from '../../service/HttpStatus'

const httpResponse = httpResponseHandler()

export const createUser = async (request, response) => {
  try {
    const result = await userService(request).createUser()
    const status = HttpStatusCode.CREATE
    return httpResponseHandler().createSuccessResponse(
      Message.USER_SAVE,
      result,
      response,
      status
    )
  } catch (error) {
    return httpResponseHandler().createErrorResponse(error, response)
  }
}

export const updateUser = async (request, response) => {
  try {
    const result = await userService(request).updateUser()
    const status = HttpStatusCode.ACCEPTED
    return httpResponse.createSuccessResponse(
      Message.USER_UPDATED,
      result,
      response,
      status
    )
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
  }
}

export const deleteUser = async (request, response) => {
  try {
    const result = await userService(request).deleteUser()
    const status = HttpStatusCode.OK
    return httpResponse.createSuccessResponse(
      Message.USER_REMOVED,
      result,
      response,
      status
    )
  } catch (error) {
    return httpResponse.createErrorResponse(error, response)
  }
}

export const getAllUser = async (request, response) => {
  try {
    const result = await userService(request).getAllUser()
    const status = HttpStatusCode.FOUND
    return httpResponse.createSuccessResponse(
      Message.USER_LIST_FOUND,
      result,
      response,
      status
    )
  } catch (error) {
    return response.status(HttpStatusCode.NOT_FOUND).json(Message.USER_NOT_FOUND)
  }
}

export const getUserById = async (request, response) => {
  try {
    const result = await userService(request).getUserById()
    const status = HttpStatusCode.FOUND
    return httpResponse.createSuccessResponse(
      Message.USER_FOUND,
      result,
      response,
      status
    ) 
  } catch (error) {
    return response.status(HttpStatusCode.NOT_FOUND).json(Message.USER_NOT_FOUND)
  }
}
