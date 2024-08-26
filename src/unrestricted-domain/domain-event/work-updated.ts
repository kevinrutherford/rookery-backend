import * as t from 'io-ts'
import { esEventBase } from './eventstore-event-base'

const frontMatterNotDetermined = t.type({
  crossrefStatus: t.literal('not-determined'),
  reason: t.union([
    t.literal('never-fetched'),
    t.literal('response-invalid'),
    t.literal('response-unavailable'),
  ]),
})

const frontMatterNotFound = t.type({
  crossrefStatus: t.literal('not-found'),
})

const frontMatterFound = t.type({
  crossrefStatus: t.literal('found'),
  title: t.string,
  abstract: t.string,
  authors: t.array(t.string),
})

export const workUpdatedEvent = t.intersection([esEventBase, t.type({
  type: t.literal('work-updated'),
  data: t.type({
    actorId: t.string,
    workId: t.string,
    attributes: t.union([frontMatterFound, frontMatterNotFound, frontMatterNotDetermined]),
  }),
})])

