import * as E from 'fp-ts/Either'
import { JsonApiDataDocument, JsonApiErrorsDocument } from './json-api/json-api-resource'
import { Authority } from '../auth/authority'

export type Service = (clientCan: Authority)
=> (input: unknown)
=> E.Either<JsonApiErrorsDocument, JsonApiDataDocument>

