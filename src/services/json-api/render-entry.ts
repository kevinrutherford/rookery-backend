import { JsonApiResource } from './json-api-resource'
import { renderCollectionIdentifier } from './render-collection-identifier'
import { renderEntryIdentifier } from './render-entry-identifier'
import { renderWorkIdentifier } from './render-work-identifier'
import { Discussion } from '../../domain/index.open'

export const renderEntry = (entry: Discussion): JsonApiResource => ({
  ...renderEntryIdentifier(entry.id),
  attributes: {
    addedAt: entry.addedAt.toISOString(),
    commentsCount: entry.commentsCount,
  },
  relationships: {
    collection: { data: renderCollectionIdentifier(entry.collectionId) },
    work: { data: renderWorkIdentifier(entry.workId) },
  },
})

