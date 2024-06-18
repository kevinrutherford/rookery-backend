import { Middleware } from '@koa/router'
import * as E from 'fp-ts/Either'
import { StatusCodes } from 'http-status-codes'
import * as Auth from '../auth'
import { Logger } from '../logger'
import * as RestrictedDomain from '../restricted-domain'
import { ErrorOutcome } from '../services/error-outcome'
import { ServicePath } from '../services/service-path'
import { Queries } from '../unrestricted-domain'

const errorToStatus = (errors: ErrorOutcome): number => {
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

  context.response.type = 'json'
  const response = service(restrictedDomain)(authority)({ ...context.params, ...context.query })
  if (E.isRight(response)) {
    context.response.status = StatusCodes.OK
    context.response.body = response.right
  } else {
    response.left.errors.forEach((error) => {
      if (error.code === 'fatal-error')
        logger.error(error.title, error.meta)
      else
        logger.debug(error.title, error.meta)
    })
    context.response.status = errorToStatus(response.left)
    context.response.body = response.left
  }
}

