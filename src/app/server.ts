import * as DomainModel from '../domain-model'
import * as EventStore from '../event-store'
import { createHttpServer } from '../http'
import * as Views from '../views'

export const makeServer = async (): Promise<void> => {
  const { queries, handleEvent } = DomainModel.instantiate()
  const views = Views.instantiate(queries)
  EventStore.instantiate(handleEvent)

  createHttpServer(views)
}

