import * as O from 'fp-ts/Option'
import { JsonApiResource } from '../json-api/json-api-resource'

export type UpdateWithIncludes = {
  data: O.Option<JsonApiResource>,
  included: ReadonlyArray<JsonApiResource>,
}

