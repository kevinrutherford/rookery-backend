import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { optionFromNullable } from 'io-ts-types'
import { Discussion, Domain } from '../../domain/index.open'
import { JsonApiResource } from '../json-api/json-api-resource'
import { renderCollection } from '../json-api/render-collection'
import { renderComment } from '../json-api/render-comment'
import { renderDiscussion } from '../json-api/render-discussion'
import { renderError } from '../json-api/render-error'
import { renderMember } from '../json-api/render-member'
import { renderWork } from '../json-api/render-work'
import { resourceEq } from '../json-api/resource-eq'
import { Service } from '../service'
import { validateInput } from '../validate-input'

const includes = t.union([
  t.literal('collection'),
  t.literal('comments'),
  t.literal('comments.author'),
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

const getInc = (
  queries: Domain,
  discussion: Discussion,
) => (opt: Includes): ReadonlyArray<JsonApiResource> => {
  switch (opt) {
    case 'collection':
      return pipe(
        discussion.collectionId,
        queries.lookupCollection,
        E.match(
          () => [],
          (c) => [renderCollection(c)],
        ),
      )
    case 'comments':
      return pipe(
        discussion.id,
        queries.findComments,
        RA.map(renderComment),
      )
    case 'comments.author':
      return pipe(
        discussion.id,
        queries.findComments,
        RA.map((comment) => comment.authorId),
        RA.map(queries.lookupMember),
        RA.rights,
        RA.map(renderMember),
      )
    case 'work':
      return pipe(
        discussion.workId,
        queries.lookupWork,
        E.match(
          () => [],
          (work) => [renderWork(work)],
        ),
      )
    default:
      return []
  }
}

const renderWithIncludes = (queries: Domain, incl: Params['include']) => (discussion: Discussion) => pipe(
  incl,
  O.matchW(
    () => ({
      data: renderDiscussion(discussion),
    }),
    (incs) => pipe(
      incs,
      RA.chain(getInc(queries, discussion)),
      RA.uniq(resourceEq),
      (i) => ({
        data: renderDiscussion(discussion),
        included: i,
      }),
    ),
  ),
)

const renderResult = (queries: Domain) => (params: Params) => pipe(
  params.id,
  queries.lookupDiscussion,
  E.bimap(
    () => renderError('not-found', 'Discussion not found', { id: params.id }),
    renderWithIncludes(queries, params.include),
  ),
)

export const getDiscussion = (queries: Domain): Service => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.chain(renderResult(queries)),
)

