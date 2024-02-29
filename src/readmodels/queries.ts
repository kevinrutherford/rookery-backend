import { Collection } from './all-collections'

export type Queries = {
  allCollections: () => ReadonlyArray<Collection>,
}

