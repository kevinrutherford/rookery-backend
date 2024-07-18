import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { includeAccount } from './include-account'
import { UpdateWithIncludes } from './update-with-includes'
import { CommunityCreated, Domain } from '../../domain/index.open'
import { renderCommunity } from '../json-api/render-community'
import { renderUpdateResource } from '../json-api/render-update-resource'

const includeCommunity = (queries: Domain) => pipe(
  queries.getCommunity(),
  O.map(renderCommunity),
)

export const renderCommunityCreatedUpdate = (queries: Domain, activity: CommunityCreated): UpdateWithIncludes => ({
  data: pipe(
    {
      type: 'update:community-created',
      id: activity.id,
      accountId: activity.actorId,
      communityId: activity.communityId,
      occurred_at: activity.created,
    },
    renderUpdateResource,
    O.some,
  ),
  included: pipe(
    [
      includeAccount(queries, activity.actorId),
      includeCommunity(queries),
    ],
    RA.compact,
  ),
})

