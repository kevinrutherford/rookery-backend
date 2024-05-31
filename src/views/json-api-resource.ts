import { Json } from 'fp-ts/Json'
import { ResourceIdentifier } from './resource-identifier'

/**
 * @deprecated Switch to JSON-LD to align with the rest of the fediverse
 */
export type JsonApiResource = ResourceIdentifier & {
  attributes: Json,
  relationships?: Record<string, {
    data: ResourceIdentifier | null,
    links?: {
      related: string,
    },
  }>,
}

/**
 * @deprecated Switch to JSON-LD to align with the rest of the fediverse
 */
export type JsonApiDocument = {
  data: JsonApiResource | ReadonlyArray<JsonApiResource>,
  included?: ReadonlyArray<JsonApiResource>,
}

