import { EventStoreDBClient, excludeSystemEvents, START } from '@eventstore/db-client'

type Listener = (event: unknown) => void

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const instantiate = (listener: Listener) => {
  const client = EventStoreDBClient.connectionString('esdb://eventstore:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000')
  const subscription = client.subscribeToAll({
    fromPosition: START,
    filter: excludeSystemEvents(),
  })

  subscription.on('data', (resolvedEvent) => {
    const event = resolvedEvent.event
    if (!event)
      return
    listener(event)
  })
}

