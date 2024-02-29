import { EventStoreDBClient, excludeSystemEvents, START } from '@eventstore/db-client'
import { allCollections, Collection } from './all-collections'
import { Queries } from './queries'

export const instantiate = (): Queries => {
  const currentState: Map<string, Collection> = new Map([
    ['chs', {
      id: 'chs',
      name: 'CHS',
      description: 'Papers under review by the CHS project',
      papersCount: 12,
      commentsCount: 23,
      followersCount: 4,
      lastActivityAt: new Date(),
    }],
    ['pru3', {
      id: 'pru3',
      name: 'PRU3',
      description: 'Papers to be referenced by the PRU3 project',
      papersCount: 134,
      commentsCount: 258,
      followersCount: 11,
      lastActivityAt: new Date(),
    }],
  ])
  const client = EventStoreDBClient.connectionString('esdb://eventstore:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000')
  const subscription = client.subscribeToAll({
    fromPosition: START,
    filter: excludeSystemEvents(),
  })

  subscription.on('data', (event) => {
    console.log(event)
    console.log(`Received event ${event.event?.revision}@${event.event?.streamId}`)
  })

  return ({
    allCollections: allCollections(currentState),
  })
}
