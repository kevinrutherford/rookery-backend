import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { renderCollection } from '../json-api/render-collection'
import { Queries } from '../queries'
import { View } from '../view'

export const getCollections = (queries: Queries): View => () => () => pipe(
  queries.allCollections(),
  RA.map(renderCollection),
  (collections) => ({
    data: collections,
  }),
  E.right,
)

