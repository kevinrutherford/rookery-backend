import { Entry } from '../../readmodels/entries/entry'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const renderEntry = (entry: Entry) => ({
  type: 'entry',
  id: entry.id,
  attributes: {
    addedAt: entry.addedAt.toISOString(),
  },
  relationships: {
    collection: {
      type: 'collection',
      id: entry.collectionId,
    },
    work: {
      type: 'work',
      id: entry.doi,
    },
  },
})

