import * as E from 'fp-ts/Either'
import { ErrorOutcome } from './error-outcome'
import { JsonApiDocument } from './json-api/json-api-resource'
import { Authority } from '../auth/authority'

export type ErrorDocument = ErrorOutcome

export type Service = (clientCan: Authority)
=> (input: unknown)
=> E.Either<ErrorDocument, JsonApiDocument>

