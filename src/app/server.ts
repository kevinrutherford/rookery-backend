import { reportEvents } from './report-events'
import * as EventStore from '../event-store'
import { createHttpServer } from '../http'
import * as Logger from '../logger'
import * as Views from '../services'
import * as UnrestrictedDomain from '../unrestricted-domain'

export const makeServer = async (): Promise<void> => {
  const logger = Logger.instantiate()
  const { domain, handleEvent } = UnrestrictedDomain.instantiate(reportEvents(logger))
  const views = Views.instantiate()
  EventStore.instantiate(handleEvent)

  createHttpServer(logger, views, domain)
}

