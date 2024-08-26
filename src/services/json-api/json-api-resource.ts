import { Json } from 'fp-ts/Json'
import { ResourceIdentifier } from './resource-identifier'

export type JsonApiResource = ResourceIdentifier & {
  attributes: Json,
  relationships?: Record<string, {
    data?: ResourceIdentifier | null,
    links?: {
      related: string,
    },
  }>,
}

export type JsonApiDataDocument = {
  data: JsonApiResource | ReadonlyArray<JsonApiResource>,
  included?: ReadonlyArray<JsonApiResource>,
}

export type ErrorCode =
  | 'bad-input'
  | 'not-found'
  | 'not-authorised'
  | 'fatal-error'

export type ErrorDocument = {
  code: ErrorCode,
  title: string,
  detail?: string,
  source?: {
    parameter: string,
  },
  meta?: Record<string, Json>,
}

export type JsonApiErrorsDocument = {
  errors: Array<ErrorDocument>,
}

