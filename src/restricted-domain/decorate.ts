import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { clientCanAccessCollection } from './client-can-access-collection'
import { clientCanSeeActivity } from './client-can-see-activity'
import { Authority } from '../auth/authority'
import { Collection, Domain, Entry } from '../domain/index.open'

const collectionIsAccessible = (clientCan: Authority) => (collection: Collection): boolean => (
  clientCanAccessCollection(clientCan)(collection.isPrivate)
)

const clientCanAccessEntry = (queries: Domain, clientCan: Authority) => (entry: Entry): boolean => pipe(
  entry.collectionId,
  queries.lookupCollection,
  E.match(
    () => false,
    collectionIsAccessible(clientCan),
  ),
)

export const allCollections = (queries: Domain, claims: Authority): Domain['allCollections'] => () => pipe(
  queries.allCollections(),
  RA.filter(collectionIsAccessible(claims)),
)

export const getLocalTimeline = (queries: Domain, claims: Authority): Domain['getLocalTimeline'] => () => pipe(
  queries.getLocalTimeline(),
  RA.filter(clientCanSeeActivity(claims)),
)

export const lookupCollection = (queries: Domain, claims: Authority): Domain['lookupCollection'] => (collectionId) => pipe(
  collectionId,
  queries.lookupCollection,
  E.filterOrElseW(
    collectionIsAccessible(claims),
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

