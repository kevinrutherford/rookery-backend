import { Domain } from '../domain/index.open'
import * as Logger from '../logger'
import { DomainObserver } from '../unrestricted-domain/index.open'

export const reportEvents = (logger: Logger.Logger): DomainObserver => (domain: Domain) => {
  const info = domain.info()
  logger.info('Events handled', { count: info.eventsCount })
  if (info.unexpectedEvents.length > 0)
    logger.warn('Unexpected events received', { events: info.unexpectedEvents })
  if (info.unrecognisedEvents.length > 0) {
    logger.error('Unrecognised event; terminating', {
      events: info.unrecognisedEvents,
    })
    process.exit(1)
  }
}

