import * as t from 'io-ts'
import { esEventBase } from './eventstore-event-base'

export const discussionStartedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('discussion-started'),
  data: t.type({
    actorId: t.string,
    discussionId: t.string,
    doi: t.string,
    collectionId: t.string,
  }),
})])

