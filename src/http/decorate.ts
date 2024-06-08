import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Authority } from '../auth/authority'
import { Queries } from '../domain-model'

export const allCollections = (queries: Queries) => (clientCan: Authority): Queries['allCollections'] => () => pipe(
  queries.allCollections(),
  RA.filter((c) => !c.isPrivate || clientCan('browse-private-collections')),
)

