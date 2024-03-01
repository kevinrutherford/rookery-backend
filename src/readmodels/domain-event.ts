import { JSONEventType } from '@eventstore/db-client'

type CollectionCreatedEvent = JSONEventType<'collection-created', {
  id: string,
  handle: string,
  name: string,
  description: string,
}>

export type DomainEvent = CollectionCreatedEvent

