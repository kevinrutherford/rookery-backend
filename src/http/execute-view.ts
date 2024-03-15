import { Request, Response } from 'express'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { StatusCodes } from 'http-status-codes'
import { ErrorOutcome } from './error-outcome'
import { Logger } from './logger'
import { View } from './view'

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

type ExecuteView = (logger: Logger) => (view: View) => (req: Request, res: Response) => void

export const executeView: ExecuteView = (logger) => (view) => async (req, res) => {
  await pipe(
    {
      ...req.params,
      ...req.body,
      ...req.query,
    },
    view,
    TE.match(
      (error) => {
        logger.debug(error.message, error.evidence)
        res.status(errorToStatus(error)).send()
      },
      (resource) => res.status(StatusCodes.OK).send(resource),
    ),
  )()
}

