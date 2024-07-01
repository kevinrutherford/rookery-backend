import { CollectionCreatedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordCollectionCreated = (state: Readmodel, event: CollectionCreatedEvent): void => {
  state.collections.set(event.data.id, { // SMELL: what if the collection already exists?
    ...event.data,
    isPrivate: false,
  })
  state.activities.push({
    ...event,
    occurredWithinPrivateCollection: false,
  })
}

