import { Json } from 'fp-ts/Json'
import { ResourceIdentifier } from './resource-identifier'
import { ErrorCode } from '../error-outcome'

export type JsonApiResource = ResourceIdentifier & {
  attributes: Json,
  relationships?: Record<string, {
    data: ResourceIdentifier | null,
    links?: {
      related: string,
    },
  }>,
}

export type JsonApiDataDocument = {
  data: JsonApiResource | ReadonlyArray<JsonApiResource>,
  included?: ReadonlyArray<JsonApiResource>,
}

type ErrorDocument = {
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

