import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

export const handleEvent = (state: Readmodel) => (event: DomainEvent): void => {
  if (event.type === 'collection-created') {
    state.set(event.data.id, {
      ...event.data,
      isPrivate: false,
    })
  } else if (event.type === 'collection-updated') {
    const id = event.data.collectionId
    const current = state.get(id)
    if (current) {
      state.set(id, {
        ...current,
        ...event.data.attributes,
      })
    }
  }
}

