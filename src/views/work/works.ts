import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { renderWork } from './render-work'
import { Queries } from '../../domain-model'
import { Work } from '../../domain-model/works/work'
import { validateInput } from '../validate-input'
import { View } from '../view'

const paramsCodec = t.type({
  'filter[crossrefStatus]': tt.optionFromNullable(t.string),
})

type Params = t.TypeOf<typeof paramsCodec>

const by = (statusParam: Params['filter[crossrefStatus]']) => (work: Work) => pipe(
  statusParam,
  O.match(
    () => true,
    (filter) => work.frontMatter.crossrefStatus === filter,
  ),
)

const ignoreInvalidCrossrefResponse = (work: Work) => (
  !(work.frontMatter.crossrefStatus === 'not-determined' && work.frontMatter.reason === 'response-invalid')
)

const selectWorks = (queries: Queries) => (params: Params) => pipe(
  queries.allWorks(),
  RA.filter(by(params['filter[crossrefStatus]'])),
  RA.filter(ignoreInvalidCrossrefResponse),
)

const renderResults = (works: ReadonlyArray<Work>) => pipe(
  works,
  RA.map(renderWork),
  (resources) => ({ data: resources }),
)

export const getWorks = (queries: Queries): View => () => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.map(selectWorks(queries)),
  E.map(renderResults),
)

