import { RecordedEvent } from '@eventstore/db-client'
import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

export const handleEvent = (state: Readmodel) => (event: RecordedEvent<DomainEvent>): void => {
  if (event.type === 'comment-created') {
    const data = event.data
    const current = state.get(data.entryId) ?? []
    current.push(data)
    state.set(data.entryId, current)
  }
}

