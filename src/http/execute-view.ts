import { Middleware } from '@koa/router'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { StatusCodes } from 'http-status-codes'
import { ParameterizedContext } from 'koa'
import { ErrorOutcome } from './error-outcome'
import { QueryHandler } from './query-handler'
import { Logger } from '../logger'

const errorToStatus = (code: ErrorOutcome): number => {
  switch (code.category) {
    case 'bad-input':
      return StatusCodes.BAD_REQUEST
    case 'not-found':
      return StatusCodes.NOT_FOUND
    default:
      return StatusCodes.INTERNAL_SERVER_ERROR
  }
}

const isAuthenticated = (context: ParameterizedContext) => (
  context.request.token !== undefined
  && context.request.token === process.env.DEVELOPMENT_BEARER_TOKEN
)

type ExecuteView = (logger: Logger) => (view: QueryHandler) => Middleware

export const executeView: ExecuteView = (logger) => (view) => async (context) => {
  await pipe(
    {
      ...context.params,
      ...context.query,
    },
    view(isAuthenticated(context)),
    TE.match(
      (error) => {
        logger.debug(error.message, error.evidence)
        context.response.status = errorToStatus(error)
        context.response.type = 'json'
        context.response.body = { error }
      },
      (resource) => {
        context.response.status = StatusCodes.OK
        context.response.type = 'json'
        context.response.body = resource
      },
    ),
  )()
}

