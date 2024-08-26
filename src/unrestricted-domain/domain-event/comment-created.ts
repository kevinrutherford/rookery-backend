import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { esEventBase } from './eventstore-event-base'

export const commentCreatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('comment-created'),
  data: t.type({
    id: t.string,
    actorId: t.string,
    discussionId: t.string,
    content: t.string,
    publishedAt: tt.DateFromISOString,
  }),
})])

