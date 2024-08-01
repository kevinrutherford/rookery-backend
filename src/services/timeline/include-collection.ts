import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { JsonApiResource } from '../json-api/json-api-resource'
import { renderCollection } from '../json-api/render-collection'

export const includeCollection = (queries: Domain, collectionId: string): O.Option<JsonApiResource> => pipe(
  collectionId,
  queries.lookupCollection,
  O.fromEither,
  O.map(renderCollection),
)

