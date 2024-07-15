import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { JsonApiResource } from '../json-api/json-api-resource'
import { renderAccount } from '../json-api/render-account'

export const includeAccount = (queries: Domain, accountId: string): O.Option<JsonApiResource> => pipe(
  accountId,
  queries.lookupAccount,
  O.fromEither,
  O.map(renderAccount),
)

