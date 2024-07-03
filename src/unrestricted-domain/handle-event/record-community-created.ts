import * as O from 'fp-ts/Option'
import { CommunityCreatedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordCommunityCreated = (state: Readmodel, event: CommunityCreatedEvent): void => {
  state.community = O.some(event.data)
  state.activities.push({
    type: 'update:community-created',
    id: event.id,
    created: event.created,
    actor: 'you',
    communityId: event.data.id,
    occurredWithinPrivateCollection: false,
  })
}

