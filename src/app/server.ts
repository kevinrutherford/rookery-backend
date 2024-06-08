import * as DomainModel from '../domain-model'
import * as EventStore from '../event-store'
import { createHttpServer } from '../http'
import * as Logger from '../logger'
import * as Views from '../views'

export const makeServer = async (): Promise<void> => {
  const logger = Logger.instantiate()
  const { queries, handleEvent } = DomainModel.instantiate(logger)
  const views = Views.instantiate()
  EventStore.instantiate(handleEvent)

  createHttpServer(logger, views, queries)
}

