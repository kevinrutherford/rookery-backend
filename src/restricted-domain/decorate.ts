import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Authority } from '../auth/authority'
import { Domain } from '../services/domain'

export const allCollections = (queries: Domain, clientCan: Authority): Domain['allCollections'] => () => pipe(
  queries.allCollections(),
  RA.filter((c) => !c.isPrivate || clientCan('browse-private-collections')),
)

export const lookupCollection = (queries: Domain, clientCan: Authority): Domain['lookupCollection'] => (collectionId) => pipe(
  collectionId,
  queries.lookupCollection,
  E.filterOrElseW(
    (collection) => !collection.isPrivate || clientCan('browse-private-collections'),
    () => 'not-authorised' as const,
  ),
)

