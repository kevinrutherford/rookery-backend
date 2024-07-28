import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { JsonApiResource } from '../json-api/json-api-resource'
import { renderMember } from '../json-api/render-member'

export const includeMember = (queries: Domain, memberId: string): O.Option<JsonApiResource> => pipe(
  memberId,
  queries.lookupMember,
  renderMember,
  O.some,
)

