import { Entry } from '../../readmodels/entries/entry'

type ResourceIdentifier = {
  type: string,
  id: string,
}

const renderCollectionIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'collection',
  id,
})

const renderEntryIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'entry',
  id,
})

const renderWorkIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'work',
  id,
})

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

