import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
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

const selectWorks = (queries: Queries) => (params: Params) => pipe(
  params.filter.crossrefStatus,
  O.match(
    () => queries.allWorks(),
    (v) => pipe(
      queries.allWorks(),
      RA.filter((w) => w.frontMatter.crossrefStatus === v),
    ),
  ),
)

export const getWorks = (queries: Queries): View => (input: unknown) => pipe(
  input,
  validateInput(paramsCodec),
  TE.fromEither,
  TE.map(selectWorks(queries)),
  TE.map(renderResults),
)

