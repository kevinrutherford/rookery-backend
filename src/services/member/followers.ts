import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { Domain } from '../../domain/index.open'
import { renderError } from '../json-api/render-error'
import { renderFollower } from '../json-api/render-follower'
import { Service } from '../service'
import { validateInput } from '../validate-input'

const paramsCodec = t.type({
  id: t.string,
})

type Params = t.TypeOf<typeof paramsCodec>

const findFollowers = (queries: Domain) => (params: Params) => pipe(
  params.id,
  queries.getFollowers,
  E.bimap(
    () => renderError('not-found', 'Member not found', { memberId: params.id }),
    RA.map(renderFollower),
  ),
)

export const getFollowers = (queries: Domain): Service => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.chain(findFollowers(queries)),
  E.map((resource) => ({ data: resource })),
)

