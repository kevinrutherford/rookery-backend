import * as t from 'io-ts'
import { esEventBase } from './eventstore-event-base'

export const memberJoinedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('member-joined'),
  data: t.type({
    id: t.string,
    username: t.string,
    displayName: t.string,
    avatarUrl: t.string,
  }),
})])

