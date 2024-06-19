import { Middleware } from '@koa/router'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { StatusCodes } from 'http-status-codes'
import * as Auth from '../auth'
import { Logger } from '../logger'
import * as RestrictedDomain from '../restricted-domain'
import { JsonApiErrorsDocument, ServicePath } from '../services'
import { Queries } from '../unrestricted-domain'

const logErrors = (logger: Logger) => (errors: JsonApiErrorsDocument): JsonApiErrorsDocument => {
  errors.errors.forEach((error) => {
    if (error.code === 'fatal-error')
      logger.error(error.title, error.meta)
    else
      logger.debug(error.title, error.meta)
  })
  return errors
}

const errorToStatus = (errors: JsonApiErrorsDocument): number => {
  switch (errors.errors[0].code) {
    case 'bad-input':
      return StatusCodes.BAD_REQUEST
    case 'not-found':
      return StatusCodes.NOT_FOUND
    case 'not-authorised':
      return StatusCodes.FORBIDDEN
    default:
      return StatusCodes.INTERNAL_SERVER_ERROR
  }
}

type InvokeService = (logger: Logger, service: ServicePath['service'], unrestrictedDomain: Queries) => Middleware

export const invokeService: InvokeService = (logger, service, unrestrictedDomain) => (context) => {
  const authority = Auth.instantiate(context.request.token)
  const restrictedDomain = RestrictedDomain.instantiate(authority, unrestrictedDomain)

  const result = pipe(
    service(restrictedDomain)(authority)({ ...context.params, ...context.query }),
    E.mapLeft(logErrors(logger)),
    E.matchW(
      (errors) => ({
        status: errorToStatus(errors),
        body: errors,
      }),
      (body) => ({
        status: StatusCodes.OK,
        body,
      }),
    ),
  )
  context.response.type = 'json'
  context.response.status = result.status
  context.response.body = result.body
}

