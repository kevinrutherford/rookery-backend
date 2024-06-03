import * as TE from 'fp-ts/TaskEither'
import { Json } from 'io-ts-types'
import { ErrorOutcome } from './error-outcome'

export type QueryHandler = (isAuthenticated: boolean) => (input: unknown) => TE.TaskEither<ErrorOutcome, Json>

