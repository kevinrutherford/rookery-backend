import * as TE from 'fp-ts/TaskEither'
import { ErrorOutcome } from './error-outcome'
import { JsonApiDocument } from '../views/json-api-resource'

export type View = (isAuthenticated: boolean) => (input: unknown) => TE.TaskEither<ErrorOutcome, JsonApiDocument>

