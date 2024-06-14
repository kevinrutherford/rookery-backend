import * as E from 'fp-ts/Either'
import { JsonApiDocument } from './json-api/json-api-resource'
import { ErrorOutcome, ServicePath } from '../http/index.open'

export type ErrorDocument = ErrorOutcome

export type View = (clientCan: Parameters<ReturnType<ServicePath['service']>>[0])
=> (input: unknown)
=> E.Either<ErrorDocument, JsonApiDocument>

