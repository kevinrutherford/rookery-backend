import * as TE from 'fp-ts/TaskEither'
import { JsonApiDocument } from './json-api-resource'
import { ErrorOutcome, QueryHandler } from '../http/index.open'

export type ErrorDocument = ErrorOutcome

export type View = (isAuthenticated: Parameters<QueryHandler>[0])
=> (input: unknown)
=> TE.TaskEither<ErrorDocument, JsonApiDocument>

