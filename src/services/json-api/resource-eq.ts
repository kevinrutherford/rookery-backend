import * as Eq from 'fp-ts/Eq'
import { JsonApiResource } from './json-api-resource'

export const resourceEq = Eq.fromEquals((a: JsonApiResource, b: JsonApiResource) => (
  (a.type === b.type && a.id === b.id)
))

