import { CollectionUpdatedEvent } from '../domain-event'
import { Readmodel } from '../readmodel'

export const recordCollectionUpdated = (state: Readmodel, event: CollectionUpdatedEvent): void => {
  const id = event.data.collectionId
  const current = state.collections.get(id)
  if (current) {
    state.collections.set(id, {
      ...current,
      ...event.data.attributes,
    })
  }
}

