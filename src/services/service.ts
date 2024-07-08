import * as E from 'fp-ts/Either'
import { JsonApiDataDocument, JsonApiErrorsDocument } from './json-api/json-api-resource'

export type Service = (input: unknown) => E.Either<JsonApiErrorsDocument, JsonApiDataDocument>

