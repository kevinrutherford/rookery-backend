import * as D from 'fp-ts/Date'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { renderWithIncludes } from './render-with-includes'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, Update } from '../../domain/index.open'
import { JsonApiResource } from '../json-api/json-api-resource'
import { resourceEq } from '../json-api/resource-eq'

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

const appendUpdate = (memo: JsonApiTimeline, para: UpdateWithIncludes): JsonApiTimeline => ({
  data: [...memo.data, para.data],
  included: pipe(
    [...memo.included, ...RA.compact(para.included)],
    RA.uniq(resourceEq),
  ),
})

export const renderAsFeed = (queries: Domain) => (updates: ReadonlyArray<Update>): JsonApiTimeline => pipe(
  updates,
  RA.sort(byDateDescending),
  RA.map(renderWithIncludes(queries)),
  RA.compact,
  RA.reduce({ data: [], included: [] }, appendUpdate),
)

