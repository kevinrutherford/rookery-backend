import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { domainEvent, DomainEvent } from './domain-event'
import { recordCollectionCreated } from './handle-event/record-collection-created'
import { recordCollectionUpdated } from './handle-event/record-collection-updated'
import { recordCommentCreated } from './handle-event/record-comment-created'
import { recordCommunityCreated } from './handle-event/record-community-created'
import { recordDoiEntered } from './handle-event/record-doi-entered'
import { recordWorkUpdated } from './handle-event/record-work-updated'
import * as Queries from './queries'
import * as State from './state'
import { Domain } from '../domain/index.open'

export type EventHandler = (event: unknown) => void

export type DomainObserver = (domain: Domain) => void

type DomainModel = {
  queries: Domain,
  handleEvent: EventHandler,
}

export const instantiate = (observer: DomainObserver): DomainModel => {
  const currentState = State.instantiate()

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

  const queries = Queries.instantiate(currentState)

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
      observer(queries)
    },
  )

  return ({
    queries,
    handleEvent,
  })
}

