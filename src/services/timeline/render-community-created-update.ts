import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { UpdateWithIncludes } from './update-with-includes'
import { CommunityCreated, Domain } from '../../domain/index.open'
import { renderCommunity } from '../json-api/render-community'
import { renderUpdateResource } from '../json-api/render-update-resource'

export const renderCommunityCreatedUpdate = (queries: Domain, activity: CommunityCreated): UpdateWithIncludes => ({
  data: pipe(
    {
      type: 'update:community-created',
      id: activity.id,
      accountId: activity.actor,
      communityId: activity.communityId,
      occurred_at: activity.created,
    },
    renderUpdateResource,
    O.some,
  ),
  included: pipe(
    queries.getCommunity(),
    O.match(
      () => [],
      (community) => [renderCommunity(community)],
    ),
  ),
})

