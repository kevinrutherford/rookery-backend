import { EventStoreDBClient, excludeSystemEvents, RecordedEvent, START } from '@eventstore/db-client'
import * as collections from './collections'
import { DomainEvent } from './domain-event'
import { findEntries } from './entries'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const instantiate = () => {
  const client = EventStoreDBClient.connectionString('esdb://eventstore:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000')
  const subscription = client.subscribeToAll({
    fromPosition: START,
    filter: excludeSystemEvents(),
  })

  const { handleEvent, queries } = collections.instantiate()

  subscription.on('data', (resolvedEvent) => {
    const event = resolvedEvent.event
    if (!event)
      return
    const x = event as RecordedEvent<DomainEvent>
    handleEvent(x)
  })

  return ({
    ...queries,
    findEntries,
  })
}

export type Queries = ReturnType<typeof instantiate>

