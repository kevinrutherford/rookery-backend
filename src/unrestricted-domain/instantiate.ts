import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Errors } from 'io-ts'
import { allCollections } from './collections/all-collections'
import { Collection } from './collections/collection'
import { lookupCollection } from './collections/lookup-collection'
import { findComments } from './comments/find-comments'
import * as community from './community'
import { domainEvent, DomainEvent } from './domain-event'
import * as entries from './entries'
import { Entry } from './entries/entry'
import * as localTimeline from './local-timeline'
import * as works from './works'
import { Work } from './works/work'
import { Comment, Domain } from '../domain/index.open'

export type EventHandler = (event: unknown) => void

export type DomainObserver = (msg: string) => (errors: Errors) => void

type DomainModel = {
  domain: Domain,
  handleEvent: EventHandler,
}

export const instantiate = (observer: DomainObserver): DomainModel => {
  const currentState = {
    activities: [],
    collections: new Map<string, Collection>(),
    comments: new Map<string, Array<Comment>>(),
    community: O.none,
    entriesByCollection: new Map<string, Array<Entry>>(),
    entriesByEntryId: new Map<string, Entry>(),
    works: new Map<string, Work>(),
  }

  const h = (state: typeof currentState) => (event: DomainEvent): void => {
    switch (event.type) {
      case 'collection-created':
      {
        state.collections.set(event.data.id, {
          ...event.data,
          isPrivate: false,
        })
        break
      }
      case 'collection-updated':
      {
        const id = event.data.collectionId
        const current = state.collections.get(id)
        if (current) {
          state.collections.set(id, {
            ...current,
            ...event.data.attributes,
          })
        }
        break
      }
      case 'comment-created':
      {
        const data = event.data
        const current = state.comments.get(data.entryId) ?? []
        current.push({
          ...data,
          createdAt: event.created,
        })
        state.comments.set(data.entryId, current)
        break
      }
      case 'community-created':
        break
      case 'doi-entered':
        break
      case 'work-updated':
        break
    }
  }

  const r2 = entries.instantiate()
  const r4 = localTimeline.instantiate()
  const r5 = works.instantiate()
  const r6 = community.instantiate()

  const dispatch = (event: DomainEvent): void => {
    h(currentState)(event)
    r2.handleEvent(event)
    r4.handleEvent(event)
    r5.handleEvent(event)
    r6.handleEvent(event)
    console.log('Event handled:', event.type)
  }

  const handleEvent: EventHandler = (event) => pipe(
    event,
    domainEvent.decode,
    E.match(
      observer('Could not parse event from EventStore'),
      dispatch,
    ),
  )

  const domain: Domain = {
    allCollections: allCollections(currentState.collections),
    lookupCollection: lookupCollection(currentState.collections),
    ...r2.queries,
    findComments: findComments(currentState.comments),
    ...r4.queries,
    ...r5.queries,
    ...r6.queries,
    info: () => ({
      unexpectedEvents: [],
      unrecognisedEvents: [],
    }),
  }

  return ({
    domain,
    handleEvent,
  })
}

