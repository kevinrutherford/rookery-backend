import { renderCollectionIdentifier } from './render-collection-identifier'
import { Collection } from '../../domain-model/collections/collection'
import { JsonApiResource } from '../json-api-resource'

export const renderCollection = (collection: Collection): JsonApiResource => ({
  ...renderCollectionIdentifier(collection.id),
  attributes: {
    description: collection.description,
    isPrivate: collection.isPrivate,
    name: collection.name,
  },
})

