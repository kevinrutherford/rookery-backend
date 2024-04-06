import { JSONEventType, RecordedEvent } from '@eventstore/db-client'
import { Work } from './works/work'

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
  workId: string,
  collectionId: string,
}>

type WorkUpdated = JSONEventType<'work-updated', {
  workId: string,
  attributes: Work['frontMatter'],
}>

export type DomainEvent =
  | RecordedEvent<CollectionCreatedEvent>
  | RecordedEvent<CommentCreatedEvent>
  | RecordedEvent<DoiEnteredEvent>
  | RecordedEvent<WorkUpdated>

