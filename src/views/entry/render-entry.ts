import { renderEntryIdentifier } from './render-entry-identifier'
import { renderCollectionIdentifier } from '../collection/render-collection-identifier'
import { JsonApiResource } from '../json-api-resource'
import { Entry } from '../queries'
import { renderWorkIdentifier } from '../work/render-work-identifier'

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

