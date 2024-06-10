import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Authority } from '../auth/authority'
import { Collection } from '../domain-model/collections/collection'
import { Queries } from '../views/queries'

export const allCollections = (queries: Queries) => (clientCan: Authority): Queries['allCollections'] => () => pipe(
  queries.allCollections(),
  RA.filter((c) => !c.isPrivate || clientCan('browse-private-collections')),
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const lookupCollection = (queries: Queries) => (clientCan: Authority) => (collectionId: string): E.Either<'not-found' | 'not-authorised', Collection> => pipe(
  collectionId,
  queries.lookupCollection,
  E.filterOrElseW(
    (collection) => !collection.isPrivate || clientCan('browse-private-collections'),
    () => 'not-authorised' as const,
  ),
)

