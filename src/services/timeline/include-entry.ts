import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { JsonApiResource } from '../json-api/json-api-resource'
import { renderEntry } from '../json-api/render-entry'

export const includeEntry = (queries: Domain, entryId: string): O.Option<JsonApiResource> => pipe(
  entryId,
  queries.lookupEntry,
  O.fromEither,
  O.map(renderEntry),
)

