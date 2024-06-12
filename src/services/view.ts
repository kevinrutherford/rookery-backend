import * as E from 'fp-ts/Either'
import { JsonApiDocument } from './json-api/json-api-resource'
import { Authority } from '../auth/authority'
import { ErrorOutcome } from '../http/index.open'

export type ErrorDocument = ErrorOutcome

export type View = (clientCan: Authority)
=> (input: unknown)
=> E.Either<ErrorDocument, JsonApiDocument>

