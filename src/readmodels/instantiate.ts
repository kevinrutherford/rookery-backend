import { EventStoreDBClient, excludeSystemEvents, JSONEventType, RecordedEvent, START } from '@eventstore/db-client'
import { allCollections, Collection } from './all-collections'
import { lookupCollection } from './lookup-collection'

type CollectionCreatedEvent = JSONEventType<'collection-created', {
  id: string,
  handle: string,
  name: string,
  description: string,
}>

type HandledEvents = CollectionCreatedEvent

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const instantiate = () => {
  const currentState: Map<string, Collection> = new Map()
  const client = EventStoreDBClient.connectionString('esdb://eventstore:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000')
  const subscription = client.subscribeToAll({
    fromPosition: START,
    filter: excludeSystemEvents(),
  })

  subscription.on('data', (resolvedEvent) => {
    const event = resolvedEvent.event
    if (!event)
      return
    const x = event as RecordedEvent<HandledEvents>
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

