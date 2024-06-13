import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

export const handleEvent = (state: Readmodel) => (event: DomainEvent): void => {
  if (event.type === 'comment-created') {
    const data = event.data
    const current = state.get(data.entryId) ?? []
    current.push({
      ...data,
      createdAt: event.created,
    })
    state.set(data.entryId, current)
  }
}

