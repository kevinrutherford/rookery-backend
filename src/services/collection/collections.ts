import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Domain } from '../domain'
import { renderCollection } from '../json-api/render-collection'
import { View } from '../view'

export const getCollections = (queries: Domain): View => () => () => pipe(
  queries.allCollections(),
  RA.map(renderCollection),
  (collections) => ({
    data: collections,
  }),
  E.right,
)

