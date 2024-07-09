import * as O from 'fp-ts/Option'
import { Activity, CommunityCreated } from '../../domain/index.open'

export const renderCommunityCreatedUpdate = (activity: CommunityCreated): O.Option<Activity> => O.some({
  type: 'update:community-created',
  id: activity.id,
  actor: activity.actor,
  communityId: activity.communityId,
  occurred_at: activity.created,
})

