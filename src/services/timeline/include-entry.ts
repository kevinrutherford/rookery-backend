import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { JsonApiResource } from '../json-api/json-api-resource'
import { renderDiscussion } from '../json-api/render-discussion'

export const includeEntry = (queries: Domain, entryId: string): O.Option<JsonApiResource> => pipe(
  entryId,
  queries.lookupEntry,
  O.fromEither,
  O.map(renderDiscussion),
)

