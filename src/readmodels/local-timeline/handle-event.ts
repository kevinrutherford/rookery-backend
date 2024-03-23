import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

export const handleEvent = (state: Readmodel) => (event: DomainEvent): void => {
  switch (event.type) {
    case 'collection-created':
    case 'doi-entered':
    case 'comment-created':
      state.push(event)
      return
    default:
  }
}

