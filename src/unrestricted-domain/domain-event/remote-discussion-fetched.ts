import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { esEventBase } from './eventstore-event-base'

export const remoteDiscussionFetchedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('remote-discussion-fetched'),
  data: t.type({ // SMELL -- coupled to discussion resource rendering
    id: t.string,
    type: t.literal('discussion'),
    attributes: t.type({
      addedAt: tt.DateFromISOString,
      title: t.string,
      commentsCount: t.number,
    }),
  }),
})])

