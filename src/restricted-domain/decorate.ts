import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Authority } from '../auth/authority'
import { Collection } from '../services/collection-resource'
import { Domain } from '../services/domain'

const clientCanAccessCollection = (clientCan: Authority) => (collection: Collection) => (
  !collection.isPrivate || clientCan('browse-private-collections')
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

