import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

export const handleEvent = (state: Readmodel) => (event: DomainEvent): void => {
  const timelineEventTypes = [
    'collection-created',
    'doi-entered',
    'comment-created',
  ]
  if (timelineEventTypes.includes(event.type))
    state.push(event)
}

