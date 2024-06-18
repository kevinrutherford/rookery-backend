import * as E from 'fp-ts/Either'
import { ErrorOutcome } from './error-outcome'
import { JsonApiDocument } from './json-api/json-api-resource'
import { ServicePath } from './service-path'

export type ErrorDocument = ErrorOutcome

export type Service = (clientCan: Parameters<ReturnType<ServicePath['service']>>[0])
=> (input: unknown)
=> E.Either<ErrorDocument, JsonApiDocument>

