import { RecordedEvent } from '@eventstore/db-client'
import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

export const handleEvent = (state: Readmodel) => (event: RecordedEvent<DomainEvent>): void => {
  if (event.type === 'doi-entered') {
    const data = event.data
    const current = state.byCollection.get(data.collectionId) ?? []
    current.push(data)
    state.byCollection.set(data.collectionId, current)
    state.byEntryId.set(data.id, data)
  }
}

