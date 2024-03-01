import { EventStoreDBClient, excludeSystemEvents, RecordedEvent, START } from '@eventstore/db-client'
import { allCollections, lookupCollection, Readmodel } from './collections'
import { DomainEvent } from './domain-event'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const instantiate = () => {
  const currentState: Readmodel = new Map()
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
    if (x.type === 'collection-created') {
      currentState.set(x.data.id, {
        ...x.data,
        papersCount: 0,
        commentsCount: 0,
        followersCount: 0,
        lastActivityAt: new Date(),
      })
    }
  })

  return ({
    allCollections: allCollections(currentState),
    lookupCollection: lookupCollection(currentState),
  })
}

export type Queries = ReturnType<typeof instantiate>

