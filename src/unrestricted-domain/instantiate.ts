import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Errors } from 'io-ts'
import { allCollections } from './collections/all-collections'
import { Collection } from './collections/collection'
import { lookupCollection } from './collections/lookup-collection'
import * as comments from './comments'
import * as community from './community'
import { domainEvent, DomainEvent } from './domain-event'
import * as entries from './entries'
import * as localTimeline from './local-timeline'
import * as works from './works'
import { Domain } from '../domain/index.open'

export type EventHandler = (event: unknown) => void

export type ReportFatalError = (msg: string) => (errors: Errors) => void

type DomainModel = {
  domain: Domain,
  handleEvent: EventHandler,
}

export const instantiate = (reportParsingError: ReportFatalError): DomainModel => {
  const currentState = {
    collections: new Map<string, Collection>(),
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
        break
      case 'community-created':
        break
      case 'doi-entered':
        break
      case 'work-updated':
        break
    }
  }

  const r2 = entries.instantiate()
  const r3 = comments.instantiate()
  const r4 = localTimeline.instantiate()
  const r5 = works.instantiate()
  const r6 = community.instantiate()

  const dispatch = (event: DomainEvent): void => {
    h(currentState)(event)
    r2.handleEvent(event)
    r3.handleEvent(event)
    r4.handleEvent(event)
    r5.handleEvent(event)
    r6.handleEvent(event)
  }

  const handleEvent: EventHandler = (event) => pipe(
    event,
    domainEvent.decode,
    E.match(
      reportParsingError('Could not parse event from EventStore'),
      dispatch,
    ),
  )

  const domain: Domain = {
    allCollections: allCollections(currentState.collections),
    lookupCollection: lookupCollection(currentState.collections),
    ...r2.queries,
    ...r3.queries,
    ...r4.queries,
    ...r5.queries,
    ...r6.queries,
  }

  return ({
    domain,
    handleEvent,
  })
}

