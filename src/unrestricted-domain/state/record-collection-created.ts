import { CollectionCreatedEvent } from '../domain-event'
import { Readmodel } from '../readmodel'

export const recordCollectionCreated = (state: Readmodel, event: CollectionCreatedEvent): void => {
  state.collections.set(event.data.id, {
    ...event.data,
    isPrivate: false,
  })
}

