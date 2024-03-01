import * as O from 'fp-ts/Option'
import { Collection } from './all-collections'

export type Queries = {
  allCollections: () => ReadonlyArray<Collection>,
  lookupCollection: (collectionId: string) => O.Option<Collection>,
}

