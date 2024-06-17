import { Json } from 'fp-ts/Json'
import { ResourceIdentifier } from './resource-identifier'
import { ErrorCode } from '../../http/error-outcome'

export type JsonApiResource = ResourceIdentifier & {
  attributes: Json,
  relationships?: Record<string, {
    data: ResourceIdentifier | null,
    links?: {
      related: string,
    },
  }>,
}

type DataDocument = {
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

type ErrorsDocument = {
  errors: Array<ErrorDocument>,
}

export type JsonApiDocument = DataDocument | ErrorsDocument

