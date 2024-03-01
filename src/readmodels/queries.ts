import * as E from 'fp-ts/Either'
import { Collection } from './all-collections'
import { CollectionWithEntries } from './lookup-collection'
import { ErrorOutcome } from '../views'

export type Queries = {
  allCollections: () => ReadonlyArray<Collection>,
  lookupCollection: (collectionId: string) => E.Either<ErrorOutcome, CollectionWithEntries>,
}

