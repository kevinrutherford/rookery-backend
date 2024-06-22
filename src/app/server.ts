import { Domain } from '../domain/index.open'
import * as EventStore from '../event-store'
import { createHttpServer } from '../http'
import * as Logger from '../logger'
import * as Views from '../services'
import * as UnrestrictedDomain from '../unrestricted-domain'
import { DomainObserver } from '../unrestricted-domain/index.open'

const reportEvents = (logger: Logger.Logger): DomainObserver => (domain: Domain) => {
  logger.info('Events handled', { count: domain.info().eventsCount })
}

export const makeServer = async (): Promise<void> => {
  const logger = Logger.instantiate()
  const { domain, handleEvent } = UnrestrictedDomain.instantiate(reportEvents(logger))
  const views = Views.instantiate()
  EventStore.instantiate(handleEvent)

  createHttpServer(logger, views, domain)
}

