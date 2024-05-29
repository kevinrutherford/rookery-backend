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

