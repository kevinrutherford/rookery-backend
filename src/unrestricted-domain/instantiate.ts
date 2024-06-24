import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Collection } from './collections/collection'
import { domainEvent, DomainEvent } from './domain-event'
import { Entry } from './entries/entry'
import { allCollections } from './queries/all-collections'
import { allWorks } from './queries/all-works'
import { findComments } from './queries/find-comments'
import { findEntries } from './queries/find-entries'
import { getCommunity } from './queries/get-community'
import { getLocalTimeline } from './queries/get-local-timeline'
import { lookupCollection } from './queries/lookup-collection'
import { lookupEntry } from './queries/lookup-entry'
import { lookupWork } from './queries/lookup-work'
import { Readmodel } from './readmodel'
import { recordCollectionCreated } from './state/record-collection-created'
import { recordCollectionUpdated } from './state/record-collection-updated'
import { recordCommentCreated } from './state/record-comment-created'
import { recordCommunityCreated } from './state/record-community-created'
import { recordDoiEntered } from './state/record-doi-entered'
import { recordWorkUpdated } from './state/record-work-updated'
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

  const dispatch = (state: typeof currentState) => (event: DomainEvent): void => {
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
        recordDoiEntered(state, event)
        break
      case 'work-updated':
        recordWorkUpdated(state, event)
        break
    }
  }

  const domain: Domain = {
    allCollections: allCollections(currentState),
    allWorks: allWorks(currentState),
    findComments: findComments(currentState),
    findEntries: findEntries(currentState),
    getCommunity: getCommunity(currentState),
    getLocalTimeline: getLocalTimeline(currentState),
    info: () => currentState.info,
    lookupCollection: lookupCollection(currentState),
    lookupEntry: lookupEntry(currentState),
    lookupWork: lookupWork(currentState),
  }

  const handleEvent: EventHandler = (event) => pipe(
    event,
    domainEvent.decode,
    E.match(
      () => {
        currentState.info.unrecognisedEvents.push(event)
      },
      dispatch(currentState),
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

