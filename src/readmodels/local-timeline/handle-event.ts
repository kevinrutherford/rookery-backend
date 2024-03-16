import { RecordedEvent } from '@eventstore/db-client'
import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

export const handleEvent = (state: Readmodel) => (event: RecordedEvent<DomainEvent>): void => {
  switch (event.type) {
    case 'collection-created':
      state.push({
        userHandle: 'you',
        action: `created collection ${event.data.name}`,
        content: '',
        timestamp: event.created.toISOString(),
      })
      return
    case 'doi-entered':
      state.push({
        userHandle: 'you',
        action: `added a paper to collection ${event.data.collectionId}`,
        content: event.data.doi,
        timestamp: event.created.toISOString(),
      })
      return
    case 'comment-created':
      state.push({
        userHandle: 'you',
        action: 'commented',
        content: event.data.content,
        timestamp: event.created.toISOString(),
      })
      return
  }
}

