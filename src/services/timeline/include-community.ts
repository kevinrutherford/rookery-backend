import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { JsonApiResource } from '../json-api/json-api-resource'
import { renderCommunity } from '../json-api/render-community'

export const includeCommunity = (queries: Domain): O.Option<JsonApiResource> => pipe(
  queries.getCommunity(),
  O.map(renderCommunity),
)

