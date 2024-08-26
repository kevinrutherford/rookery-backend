import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { esEventBase } from './eventstore-event-base'

export const inboxCommentCreatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('inbox:comment-created'),
  data: t.type({
    id: t.string,
    actorId: t.string,
    publishedAt: tt.DateFromISOString,
    discussionId: t.string,
    content: t.string,
  }),
})])

