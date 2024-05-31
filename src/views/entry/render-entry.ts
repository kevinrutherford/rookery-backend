import { renderEntryIdentifier } from './render-entry-identifier'
import { Entry } from '../../domain-model/entries/entry'
import { renderCollectionIdentifier } from '../collection/render-collection-identifier'
import { JsonApiResource } from '../json-api-resource'
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

