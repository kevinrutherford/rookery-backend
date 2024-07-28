import * as O from 'fp-ts/Option'
import { cacheActor } from './cache-actor'
import { CommunityCreatedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordCommunityCreated = (state: Readmodel, event: CommunityCreatedEvent): void => {
  state.community = O.some(event.data)
  state.updates.push({
    type: 'update:community-created',
    id: event.id,
    created: event.created,
    actorId: event.data.actorId,
    communityId: event.data.id,
    occurredWithinPrivateCollection: false,
  })
  cacheActor(state, event.data.actorId) // SMELL -- duplicated for all events
}

