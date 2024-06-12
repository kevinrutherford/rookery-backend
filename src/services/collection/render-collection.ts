import { renderCollectionIdentifier } from './render-collection-identifier'
import { JsonApiResource } from '../json-api-resource'
import { Collection } from '../queries'

export const renderCollection = (collection: Collection): JsonApiResource => ({
  ...renderCollectionIdentifier(collection.id),
  attributes: {
    description: collection.description,
    isPrivate: collection.isPrivate,
    name: collection.name,
  },
})

