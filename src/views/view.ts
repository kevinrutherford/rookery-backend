import * as E from 'fp-ts/Either'
import { JsonApiDocument } from './json-api-resource'
import { ErrorOutcome, QueryHandler } from '../http/index.open'

export type ErrorDocument = ErrorOutcome

export type View = (clientCan: Parameters<QueryHandler>[0])
=> (input: unknown)
=> E.Either<ErrorDocument, JsonApiDocument>

