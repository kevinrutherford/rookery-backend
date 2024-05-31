import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { renderWork } from './render-work'
import { Queries } from '../../domain-model'
import { Work } from '../../domain-model/works/work'
import { View } from '../../http/index.open'
import { validateInput } from '../validate-input'

const paramsCodec = t.type({
  filter: tt.optionFromNullable(t.type({
    crossrefStatus: t.string,
  })),
})

type Params = t.TypeOf<typeof paramsCodec>

const renderResults = (works: ReadonlyArray<Work>) => pipe(
  works,
  RA.map(renderWork),
  (resources) => ({ data: resources }),
)

const selectWorks = (queries: Queries) => (params: Params) => pipe(
  params.filter,
  O.match(
    () => queries.allWorks(),
    (filter) => pipe(
      queries.allWorks(),
      RA.filter((work) => work.frontMatter.crossrefStatus === filter.crossrefStatus),
    ),
  ),
  RA.filter((work) => !(work.frontMatter.crossrefStatus === 'not-determined' && work.frontMatter.reason === 'response-invalid')),
)

export const getWorks = (queries: Queries): View => () => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.map(selectWorks(queries)),
  E.map(renderResults),
  T.of,
)

