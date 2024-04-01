import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { Json, optionFromNullable } from 'io-ts-types'
import { renderEntry } from './render-entry'
import { ErrorOutcome, View } from '../../http/index.open'
import { Queries } from '../../readmodels'
import { Entry } from '../../readmodels/entries/entry'
import { renderCollection } from '../collection/render-collection'
import { validateInput } from '../validate-input'

const includes = t.union([
  t.literal('collection'),
  t.literal('comments'),
  t.literal('work'),
])

type Includes = t.TypeOf<typeof includes>

const csv = new t.Type<ReadonlyArray<Includes>, string, unknown>(
  'CommaSeparatedValueCodec',
  (input): input is Array<Includes> => (
    Array.isArray(input)
    && input.every((value) => typeof value === 'string' && includes.is(value))
  ),
  (input, context) => pipe(
    t.string.validate(input, context),
    E.map((str) => str.split(',')),
    E.chain(E.traverseArray((v) => includes.validate(v, context))),
  ),
  (output: ReadonlyArray<Includes>) => output.join(','),
)

const paramsCodec = t.type({
  id: t.string,
  include: optionFromNullable(csv),
})

type Params = t.TypeOf<typeof paramsCodec>

const renderWithIncludes = (queries: Queries, incl: Params['include']) => (entry: Entry): E.Either<ErrorOutcome, Json> => pipe(
  incl,
  O.match(
    () => E.right({
      data: {
        ...renderEntry(entry),
        comments: queries.findComments(entry.id),
      },
    }),
    () => E.right({
      data: {
        ...renderEntry(entry),
        comments: queries.findComments(entry.id),
      },
      included: pipe(
        [
          pipe(
            entry.collectionId,
            queries.lookupCollection,
            O.map(renderCollection),
          ),
        ],
        RA.compact,
      ),
    }),
  ),
)

const renderResult = (queries: Queries) => (params: Params) => pipe(
  params.id,
  queries.lookupEntry,
  E.fromOption(() => ({
    category: 'not-found' as const,
    message: 'Entry not found',
    evidence: { id: params.id },
  })),
  E.chain(renderWithIncludes(queries, params.include)),
)

export const getEntry = (queries: Queries): View => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.chainW(renderResult(queries)),
  T.of,
)

