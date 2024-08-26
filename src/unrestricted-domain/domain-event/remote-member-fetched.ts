import * as t from 'io-ts'
import { esEventBase } from './eventstore-event-base'

export const remoteMemberFetchedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('remote-member-fetched'),
  data: t.type({ // SMELL -- coupled to member resource rendering
    id: t.string,
    type: t.literal('member'),
    attributes: t.type({
      username: t.string,
      display_name: t.string,
      avatar_url: t.string,
      followingCount: t.number,
    }),
  }),
})])

