import { JSONEventType, RecordedEvent } from '@eventstore/db-client'
import { Work } from './works/work'

type CommunityCreatedEvent = JSONEventType<'community-created', {
  id: string,
  name: string,
  affiliation: string,
  overview: ReadonlyArray<string>,
}>

type CollectionCreatedEvent = JSONEventType<'collection-created', {
  id: string,
  name: string,
  description: string,
}>

type CollectionUpdatedEvent = JSONEventType<'collection-updated', {
  collectionId: string,
  attributes: {
    isPrivate: boolean,
  },
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
  | RecordedEvent<CommunityCreatedEvent>
  | RecordedEvent<CollectionCreatedEvent>
  | RecordedEvent<CollectionUpdatedEvent>
  | RecordedEvent<CommentCreatedEvent>
  | RecordedEvent<DoiEnteredEvent>
  | RecordedEvent<WorkUpdated>

