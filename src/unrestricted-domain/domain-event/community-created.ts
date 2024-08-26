import * as t from 'io-ts'
import { esEventBase } from './eventstore-event-base'

export const communityCreatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('community-created'),
  data: t.type({
    id: t.string,
    actorId: t.string,
    name: t.string,
    affiliation: t.string,
    overview: t.array(t.string),
    theme: t.string,
  }),
})])

