import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { Domain } from '../../domain/index.open'
import { renderMember } from '../json-api/render-member'
import { Service } from '../service'
import { validateInput } from '../validate-input'

const paramsCodec = t.type({
  id: t.string,
})

type Params = t.TypeOf<typeof paramsCodec>

const renderResult = (queries: Domain) => (params: Params) => pipe(
  params.id,
  queries.lookupMember,
  renderMember,
)

export const getMember = (queries: Domain): Service => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.map(renderResult(queries)),
  E.map((resource) => ({ data: resource })),
)

