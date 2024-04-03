import { renderEntryIdentifier } from './render-entry-identifier'
import { Entry } from '../../readmodels/entries/entry'
import { renderCollectionIdentifier } from '../collection/render-collection-identifier'
import { renderWorkIdentifier } from '../work/render-work-identifier'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const renderEntry = (entry: Entry) => ({
  ...renderEntryIdentifier(entry.id),
  attributes: {
    addedAt: entry.addedAt.toISOString(),
  },
  relationships: {
    collection: renderCollectionIdentifier(entry.collectionId),
    work: {
      ...renderWorkIdentifier(entry.workId),
    },
  },
})

