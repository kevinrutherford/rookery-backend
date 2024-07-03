import * as O from 'fp-ts/Option'
import { CommunityCreated } from '../../domain/domain'
import { Activity } from '../../domain/index.open'

export const toCommunityCreatedUpdate = (activity: CommunityCreated): O.Option<Activity> => O.some({
  type: 'update:community-created',
  id: activity.id,
  actor: activity.actor,
  communityId: activity.communityId,
  occurred_at: activity.created,
})

