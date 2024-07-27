import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { domainEvent } from './domain-event'
import * as HandleEvent from './handle-event'
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
  const { dispatch } = HandleEvent.instantiate()

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

