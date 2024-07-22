import * as D from 'fp-ts/Date'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { renderWithIncludes } from './render-with-includes'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, Update } from '../../domain/index.open'
import { JsonApiResource } from '../json-api/json-api-resource'
import { resourceEq } from '../json-api/resource-eq'
import { Service } from '../service'

const byDate: Ord.Ord<Update> = pipe(
  D.Ord,
  Ord.contramap((update) => update.created),
)

const byDateDescending: Ord.Ord<Update> = pipe(
  byDate,
  Ord.reverse,
)

type JsonApiTimeline = {
  data: ReadonlyArray<JsonApiResource>,
  included: ReadonlyArray<JsonApiResource>,
}

const appendUpdate = (memo: JsonApiTimeline, para: UpdateWithIncludes): JsonApiTimeline => pipe(
  para.data,
  O.match(
    () => memo,
    (resource) => ({
      data: [...memo.data, resource],
      included: pipe(
        [...memo.included, ...para.included],
        RA.uniq(resourceEq),
      ),
    }),
  ),
)

export const getLocalTimeline = (queries: Domain): Service => () => pipe(
  queries.getLocalTimeline(),
  RA.sort(byDateDescending),
  RA.map(renderWithIncludes(queries)),
  RA.reduce({ data: [], included: [] }, appendUpdate),
  E.right,
)

