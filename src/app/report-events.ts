import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Domain } from '../domain/index.open'
import * as Logger from '../logger'
import { DomainObserver } from '../unrestricted-domain/index.open'

export const reportEvents = (logger: Logger.Logger): DomainObserver => (domain: Domain) => {
  const info = domain.info()
  logger.info('Events handled', { count: info.eventsCount })
  if (info.unexpectedEvents.length > 0) {
    logger.warn('Unexpected events received', {
      events: pipe(
        info.unexpectedEvents, // SMELL -- unnecessary eventstore details
        RA.map((event) => JSON.stringify(event, (_, v) => (typeof v === 'bigint' ? v.toString() : v))),
      ),
    })
  }
  if (info.unrecognisedEvents.length > 0) {
    logger.error('Unrecognised event; terminating', {
      events: pipe(
        info.unrecognisedEvents, // SMELL -- unnecessary eventstore details
        RA.map((event) => JSON.stringify(event, (_, v) => (typeof v === 'bigint' ? v.toString() : v))),
      ),
    })
    process.exit(1)
  }
}

