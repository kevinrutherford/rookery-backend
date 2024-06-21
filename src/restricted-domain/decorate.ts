import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Authority } from '../auth/authority'
import { Collection, Domain, Entry } from '../domain/index.open'

const clientCanAccessCollection = (clientCan: Authority) => (collection: Collection): boolean => (
  !collection.isPrivate || clientCan('browse-private-collections')
)

const clientCanAccessEntry = (queries: Domain, clientCan: Authority) => (entry: Entry): boolean => pipe(
  entry.collectionId,
  queries.lookupCollection,
  E.match(
    () => false,
    clientCanAccessCollection(clientCan),
  ),
)

export const allCollections = (queries: Domain, claims: Authority): Domain['allCollections'] => () => pipe(
  queries.allCollections(),
  RA.filter(clientCanAccessCollection(claims)),
)

export const lookupCollection = (queries: Domain, claims: Authority): Domain['lookupCollection'] => (collectionId) => pipe(
  collectionId,
  queries.lookupCollection,
  E.filterOrElseW(
    clientCanAccessCollection(claims),
    () => 'not-authorised' as const,
  ),
)

export const lookupEntry = (queries: Domain, claims: Authority): Domain['lookupEntry'] => (entryId) => pipe(
  entryId,
  queries.lookupEntry,
  E.filterOrElseW(
    clientCanAccessEntry(queries, claims),
    () => 'not-authorised' as const,
  ),
)

