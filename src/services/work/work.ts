import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { Domain } from '../../domain/index.open'
import { renderError } from '../json-api/render-error'
import { renderWork } from '../json-api/render-work'
import { Service } from '../service'
import { validateInput } from '../validate-input'

const paramsCodec = t.type({
  id: t.string,
})

export const getWork = (queries: Domain): Service => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.map((params) => params.id),
  E.chain(flow(
    queries.lookupWork,
    E.mapLeft((domainError) => renderError(domainError, 'Could not find work', {
      input: JSON.stringify(input),
    })),
  )),
  E.map(renderWork),
  E.map((resource) => ({ data: resource })),
)

