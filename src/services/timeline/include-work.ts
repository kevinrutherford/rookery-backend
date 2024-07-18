import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { JsonApiResource } from '../json-api/json-api-resource'
import { renderWork } from '../json-api/render-work'

export const includeWork = (queries: Domain, workId: string): O.Option<JsonApiResource> => pipe(
  workId,
  queries.lookupWork,
  O.fromEither,
  O.map(renderWork),
)

