import { Middleware } from '@koa/router'
import * as E from 'fp-ts/Either'
import { StatusCodes } from 'http-status-codes'
import { ErrorCode } from './error-outcome'
import { ServicePath } from './service-path'
import * as Auth from '../auth'
import { Logger } from '../logger'
import * as RestrictedDomain from '../restricted-domain'
import { Queries } from '../unrestricted-domain'

const errorToStatus = (code: ErrorCode): number => {
  switch (code) {
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

  context.response.type = 'json'
  const response = service(restrictedDomain)(authority)({ ...context.params, ...context.query })
  if (E.isRight(response)) {
    context.response.status = StatusCodes.OK
    context.response.body = response.right
  } else {
    logger.debug(response.left.message, response.left.evidence)
    context.response.status = errorToStatus(response.left.category)
    context.response.body = { errors: [response.left] }
  }
}

