import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { renderWork } from './render-work'
import { View } from '../../http/index.open'
import { Queries } from '../../readmodels'
import { Work } from '../../readmodels/works/work'
import { validateInput } from '../validate-input'

const paramsCodec = t.type({
  filter: t.type({
    crossrefStatus: tt.optionFromNullable(t.string),
  }),
})

type Params = t.TypeOf<typeof paramsCodec>

const renderResults = (works: ReadonlyArray<Work>) => pipe(
  works,
  RA.map(renderWork),
  (resources) => ({ data: resources }),
)

const predicateFrom = (filter: Params['filter']['crossrefStatus']) => (work: Work) => pipe(
  filter,
  O.match(
    () => true,
    (v) => work.frontMatter.crossrefStatus === v,
  ),
)

const selectWorks = (queries: Queries) => (params: Params) => pipe(
  queries.allWorks(),
  RA.filter(predicateFrom(params.filter.crossrefStatus)),
)

export const getWorks = (queries: Queries): View => (input: unknown) => pipe(
  input,
  validateInput(paramsCodec),
  E.map(selectWorks(queries)),
  E.map(renderResults),
  T.of,
)

