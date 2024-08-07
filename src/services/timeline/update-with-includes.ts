import * as O from 'fp-ts/Option'
import { JsonApiResource } from '../json-api/json-api-resource'

export type UpdateWithIncludes = {
  data: JsonApiResource,
  included: ReadonlyArray<O.Option<JsonApiResource>>,
}

