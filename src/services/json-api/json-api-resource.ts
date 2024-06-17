import { Json } from 'fp-ts/Json'
import { ResourceIdentifier } from './resource-identifier'

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
  code: 'not-found' | 'not-authorised' | 'fatal-error',
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

