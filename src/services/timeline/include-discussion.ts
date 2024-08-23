import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { JsonApiResource } from '../json-api/json-api-resource'
import { renderDiscussion } from '../json-api/render-discussion'

export const includeDiscussion = (queries: Domain, discussionId: string): O.Option<JsonApiResource> => pipe(
  discussionId,
  queries.lookupDiscussion,
  O.fromEither,
  O.map(renderDiscussion),
)

