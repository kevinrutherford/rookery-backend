import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { renderCollection } from './render-collection'
import { View } from '../../http/index.open'
import { Queries } from '../../readmodels'
import { validateInput } from '../validate-input'

const paramsCodec = t.type({
  isAuthenticated: t.boolean,
})

export const getCollections = (queries: Queries): View => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.map((params) => pipe(
    queries.allCollections(),
    RA.filter((c) => !c.isPrivate || params.isAuthenticated),
    RA.map(renderCollection),
    (collections) => ({
      data: collections,
    }),
  )),
  TE.fromEither,
)

