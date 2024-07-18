import { CollectionCreatedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordCollectionCreated = (state: Readmodel, event: CollectionCreatedEvent): void => {
  state.collections.set(event.data.id, { // SMELL: what if the collection already exists?
    ...event.data,
    isPrivate: false,
  })
  state.activities.push({
    type: event.type,
    id: event.id,
    created: event.created,
    actorId: 'you',
    occurredWithinPrivateCollection: false,
    name: event.data.name,
  })
}

