import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { allCollections } from './collections/all-collections'
import { Collection } from './collections/collection'
import { lookupCollection } from './collections/lookup-collection'
import { findComments } from './comments/find-comments'
import { getCommunity } from './community/get-community'
import { domainEvent, DomainEvent } from './domain-event'
import { Entry } from './entries/entry'
import { findEntries } from './entries/find-entries'
import { lookupEntry } from './entries/lookup-entry'
import { getLocalTimeline } from './local-timeline/get-local-timeline'
import { Readmodel } from './readmodel'
import { recordCollectionCreated } from './state/record-collection-created'
import { recordCollectionUpdated } from './state/record-collection-updated'
import { recordCommentCreated } from './state/record-comment-created'
import { recordCommunityCreated } from './state/record-community-created'
import { recordDoiEntered } from './state/record-doi-entered'
import { recordWorkUpdated } from './state/record-work-updated'
import { allWorks } from './works/all-works'
import { lookupWork } from './works/lookup-work'
import { Work } from './works/work'
import { Comment, Domain } from '../domain/index.open'

export type EventHandler = (event: unknown) => void

export type DomainObserver = (domain: Domain) => void

type DomainModel = {
  domain: Domain,
  handleEvent: EventHandler,
}

export const instantiate = (observer: DomainObserver): DomainModel => {
  const currentState: Readmodel = {
    activities: [],
    collections: new Map<string, Collection>(),
    comments: new Map<string, Array<Comment>>(),
    community: O.none,
    entriesByCollection: new Map<string, Array<Entry>>(),
    entriesByEntryId: new Map<string, Entry>(),
    works: new Map<string, Work>(),
    info: {
      eventsCount: 0,
      unexpectedEvents: [],
      unrecognisedEvents: [],
    },
  }

  const h = (state: typeof currentState) => (event: DomainEvent): void => {
    switch (event.type) {
      case 'collection-created':
        recordCollectionCreated(state, event)
        break
      case 'collection-updated':
        recordCollectionUpdated(state, event)
        break
      case 'comment-created':
        recordCommentCreated(state, event)
        break
      case 'community-created':
        recordCommunityCreated(state, event)
        break
      case 'doi-entered':
        recordDoiEntered(currentState, event)
        break
      case 'work-updated':
        recordWorkUpdated(state, event)
        break
    }
  }

  const dispatch = (event: DomainEvent): void => {
    h(currentState)(event)
  }

  const domain: Domain = {
    allCollections: allCollections(currentState.collections),
    getCommunity: getCommunity(currentState),
    lookupCollection: lookupCollection(currentState.collections),
    findComments: findComments(currentState.comments),
    findEntries: findEntries(currentState),
    lookupEntry: lookupEntry(currentState),
    getLocalTimeline: getLocalTimeline(currentState),
    allWorks: allWorks(currentState.works),
    lookupWork: lookupWork(currentState.works),
    info: () => currentState.info,
  }

  const handleEvent: EventHandler = (event) => pipe(
    event,
    domainEvent.decode,
    E.match(
      () => {
        currentState.info.unrecognisedEvents.push(event)
      },
      dispatch,
    ),
    () => {
      currentState.info.eventsCount += 1
      observer(domain)
    },
  )

  return ({
    domain,
    handleEvent,
  })
}

