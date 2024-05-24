import { renderCollectionIdentifier } from './render-collection-identifier'
import { Collection } from '../../readmodels/collections/collection'
import { JsonApiResource } from '../json-api-resource'

export const renderCollection = (collection: Collection): JsonApiResource => ({
  ...renderCollectionIdentifier(collection.id),
  attributes: {
    description: collection.description,
    isPrivate: false,
    name: collection.name,
  },
})

