import * as t from 'io-ts'
import { esEventBase } from './eventstore-event-base'

export const collectionUpdatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('collection-updated'),
  data: t.type({
    actorId: t.string,
    collectionId: t.string,
    attributes: t.type({
      isPrivate: t.boolean,
    }),
  }),
})])

