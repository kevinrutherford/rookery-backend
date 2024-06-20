import { JsonApiResource } from './json-api-resource'
import { renderCollectionIdentifier } from './render-collection-identifier'
import { renderEntryIdentifier } from './render-entry-identifier'
import { renderWorkIdentifier } from './render-work-identifier'
import { Entry } from '../../domain/index.open'

export const renderEntry = (entry: Entry): JsonApiResource => ({
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

