import * as O from 'fp-ts/Option'
import { CommunityCreated } from '../../domain/domain'
import { Activity } from '../../domain/index.open'

export const toCommunityCreatedUpdate = (activity: CommunityCreated): O.Option<Activity> => O.some({
  id: activity.id,
  actor: activity.actor,
  action: `created this community ${activity.name}`,
  content: '',
  occurred_at: activity.created,
})

