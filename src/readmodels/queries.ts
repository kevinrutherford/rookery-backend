import { Collection } from './all-collections'
import { CollectionWithEntries } from './lookup-collection'

export type Queries = {
  allCollections: () => ReadonlyArray<Collection>,
  lookupCollection: () => CollectionWithEntries,
}

