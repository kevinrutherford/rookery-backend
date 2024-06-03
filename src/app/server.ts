import * as DomainModel from '../domain-model'
import * as EventStore from '../event-store'
import { createHttpServer } from '../http'
import * as Logger from '../logger'
import * as Views from '../views'

export const makeServer = async (): Promise<void> => {
  const logger = Logger.create({
    emit: (s: string) => process.stdout.write(s),
    colour: process.env.NODE_ENV !== 'production',
    level: process.env.LOG_LEVEL ?? 'debug',
  })
  const { queries, handleEvent } = DomainModel.instantiate()
  const views = Views.instantiate(queries)
  EventStore.instantiate(handleEvent)

  createHttpServer(logger, views)
}

