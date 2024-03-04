import { JSONEventType } from '@eventstore/db-client'

type CollectionCreatedEvent = JSONEventType<'collection-created', {
  id: string,
  handle: string,
  name: string,
  description: string,
}>

type CommentCreatedEvent = JSONEventType<'comment-created', {
  id: string,
  entryId: string,
  content: string,
}>

type DoiEnteredEvent = JSONEventType<'doi-entered', {
  id: string,
  doi: string,
  collectionId: string,
}>

export type DomainEvent =
  | CollectionCreatedEvent
  | CommentCreatedEvent
  | DoiEnteredEvent

