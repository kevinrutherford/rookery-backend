import * as t from 'io-ts'
import { esEventBase } from './eventstore-event-base'

export const inboxMemberFollowedMemberEvent = t.intersection([esEventBase, t.type({
  type: t.literal('inbox:member-followed-member'),
  data: t.type({
    id: t.string,
    remoteActorId: t.string,
    remoteActorUrl: t.string,
    localMemberId: t.string,
  }),
})])

