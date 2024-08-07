import * as O from 'fp-ts/Option'
import { recordUpdate } from './record-update'
import { CommunityCreatedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordCommunityCreated = (state: Readmodel, event: CommunityCreatedEvent): void => {
  state.community = O.some(event.data)
  recordUpdate(state, {
    kind: 'update:community-created',
    id: event.id,
    created: event.created,
    actorId: event.data.actorId,
    communityId: event.data.id,
    occurredWithinPrivateCollection: false,
  })
}

