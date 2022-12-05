import { HttpError, HttpStatusCode } from '../service/HttpError'

export const httpResponseHandler = () => {

  const createSuccessResponse = (message: string, result, response) => {
    const status = HttpStatusCode.OK
    response.status(status).json({ message, result })
    return response
  }

  const createErrorResponse = (error, response) => {
    let status = HttpStatusCode.INTERNAL_SERVER
    if (error instanceof HttpError) {
      status = error.status
    }
    response.status(status).json(error)
    return response
  }

  return { createSuccessResponse, createErrorResponse }
}
