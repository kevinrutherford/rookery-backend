import { RecordedEvent } from '@eventstore/db-client'
import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleEvent = (state: Readmodel) => (event: RecordedEvent<DomainEvent>): void => {
  if (event.type === 'doi-entered') {
    const data = event.data
    const current = state.get(data.collectionId) ?? []
    current.push(data)
    state.set(data.collectionId, current)
  }
}

