import { EventStoreDBClient, excludeSystemEvents, RecordedEvent, START } from '@eventstore/db-client'
import { allCollections, lookupCollection, Readmodel } from './collections'
import { DomainEvent } from './domain-event'

const handleEvent = (state: Readmodel, event: RecordedEvent<DomainEvent>): Readmodel => {
  if (event.type === 'collection-created') {
    state.set(event.data.id, {
      ...event.data,
      papersCount: 0,
      commentsCount: 0,
      followersCount: 0,
      lastActivityAt: new Date(),
    })
  }
  return state
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const instantiate = () => {
  let currentState: Readmodel = new Map()
  const client = EventStoreDBClient.connectionString('esdb://eventstore:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000')
  const subscription = client.subscribeToAll({
    fromPosition: START,
    filter: excludeSystemEvents(),
  })

  subscription.on('data', (resolvedEvent) => {
    const event = resolvedEvent.event
    if (!event)
      return
    const x = event as RecordedEvent<DomainEvent>
    currentState = handleEvent(currentState, x)
  })

  return ({
    allCollections: allCollections(currentState),
    lookupCollection: lookupCollection(currentState),
  })
}

export type Queries = ReturnType<typeof instantiate>

