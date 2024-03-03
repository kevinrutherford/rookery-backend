import { EventStoreDBClient, excludeSystemEvents, RecordedEvent, START } from '@eventstore/db-client'
import * as collections from './collections'
import { DomainEvent } from './domain-event'
import * as entries from './entries'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const instantiate = () => {
  const client = EventStoreDBClient.connectionString('esdb://eventstore:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000')
  const subscription = client.subscribeToAll({
    fromPosition: START,
    filter: excludeSystemEvents(),
  })

  const r1 = collections.instantiate()
  const r2 = entries.instantiate()

  subscription.on('data', (resolvedEvent) => {
    const event = resolvedEvent.event
    if (!event)
      return
    const x = event as RecordedEvent<DomainEvent>
    r1.handleEvent(x)
    r2.handleEvent(x)
  })

  return ({
    ...r1.queries,
    ...r2.queries,
  })
}

export type Queries = ReturnType<typeof instantiate>

