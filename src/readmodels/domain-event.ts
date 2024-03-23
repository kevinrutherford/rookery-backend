import { JSONEventType, RecordedEvent } from '@eventstore/db-client'

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

type FrontMatterAdded = JSONEventType<'front-matter-added', {
  entryId: string,
  frontMatter: {
    title: string,
    abstract: string,
    authors: ReadonlyArray<string>,
  },
}>

export type DomainEvent =
  | RecordedEvent<CollectionCreatedEvent>
  | RecordedEvent<CommentCreatedEvent>
  | RecordedEvent<DoiEnteredEvent>
  | RecordedEvent<FrontMatterAdded>

