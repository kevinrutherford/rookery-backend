import { formatValidationErrors } from 'io-ts-reporters'
import * as EventStore from '../event-store'
import { createHttpServer } from '../http'
import * as Logger from '../logger'
import * as Views from '../services'
import * as UnrestrictedDomain from '../unrestricted-domain'
import { ReportFatalError } from '../unrestricted-domain'

const reportFatalError = (logger: Logger.Logger): ReportFatalError => (msg) => (errors) => {
  logger.error(msg, { errors: formatValidationErrors(errors) })
  process.exit(1)
}

export const makeServer = async (): Promise<void> => {
  const logger = Logger.instantiate()
  const { domain, handleEvent } = UnrestrictedDomain.instantiate(reportFatalError(logger))
  const views = Views.instantiate()
  EventStore.instantiate(handleEvent)

  createHttpServer(logger, views, domain)
}

