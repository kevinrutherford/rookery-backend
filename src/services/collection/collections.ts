import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { renderCollection } from '../json-api/render-collection'
import { Service } from '../service'

export const getCollections = (queries: Domain): Service => () => () => pipe(
  queries.allCollections(),
  RA.map(renderCollection),
  (collections) => ({
    data: collections,
  }),
  E.right,
)

