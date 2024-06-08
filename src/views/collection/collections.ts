import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { renderCollection } from './render-collection'
import { Queries } from '../../domain-model'
import { View } from '../view'

export const getCollections = (queries: Queries): View => (clientCan) => () => pipe(
  queries.allCollections(),
  RA.filter((c) => !c.isPrivate || clientCan('browse-private-collections')),
  RA.map(renderCollection),
  (collections) => ({
    data: collections,
  }),
  E.right,
)

