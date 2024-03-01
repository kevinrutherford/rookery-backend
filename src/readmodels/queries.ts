import * as O from 'fp-ts/Option'
import { Collection } from './all-collections'
import { CollectionWithEntries } from './lookup-collection'

export type Queries = {
  allCollections: () => ReadonlyArray<Collection>,
  lookupCollection: (collectionId: string) => O.Option<CollectionWithEntries>,
}

