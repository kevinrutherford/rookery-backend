import { JsonApiResource } from './json-api-resource'
import { renderCollectionIdentifier } from './render-collection-identifier'
import { Collection } from '../../domain/index.open'

export const renderCollection = (collection: Collection): JsonApiResource => ({
  ...renderCollectionIdentifier(collection.id),
  attributes: {
    description: collection.description,
    discussionCount: collection.discussionCount,
    isPrivate: collection.isPrivate,
    name: collection.name,
  },
})

