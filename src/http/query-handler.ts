import * as TE from 'fp-ts/TaskEither'
import { Json } from 'io-ts-types'
import { ErrorOutcome } from './error-outcome'
import { Authority } from '../auth/authority'

export type QueryHandler = (clientCan: Authority) => (input: unknown) => TE.TaskEither<ErrorOutcome, Json>

