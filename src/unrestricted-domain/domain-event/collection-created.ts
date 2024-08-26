import * as t from 'io-ts'
import { esEventBase } from './eventstore-event-base'

export const collectionCreatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('collection-created'),
  data: t.type({
    id: t.string,
    actorId: t.string,
    name: t.string,
    description: t.string,
  }),
})])

