import * as EventStore from '../event-store'
import { createHttpServer } from '../http'
import * as Logger from '../logger'
import * as Views from '../services'
import * as UnrestrictedDomain from '../unrestricted-domain'
import { DomainObserver } from '../unrestricted-domain/index.open'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reportFatalError = (logger: Logger.Logger): DomainObserver => () => {
}

export const makeServer = async (): Promise<void> => {
  const logger = Logger.instantiate()
  const { domain, handleEvent } = UnrestrictedDomain.instantiate(reportFatalError(logger))
  const views = Views.instantiate()
  EventStore.instantiate(handleEvent)

  createHttpServer(logger, views, domain)
}

