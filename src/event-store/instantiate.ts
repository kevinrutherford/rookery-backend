import { EventStoreDBClient, excludeSystemEvents, START } from '@eventstore/db-client'
import { EventHandler } from '../unrestricted-domain'

export const instantiate = (listener: EventHandler): void => {
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

