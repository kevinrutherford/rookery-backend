import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Errors } from 'io-ts'
import { formatValidationErrors } from 'io-ts-reporters'
import * as collections from './collections'
import * as comments from './comments'
import * as community from './community'
import { domainEvent, DomainEvent } from './domain-event'
import * as entries from './entries'
import * as localTimeline from './local-timeline'
import * as works from './works'
import { Domain } from '../domain/index.open'
import { Logger } from '../logger'

export type EventHandler = (event: unknown) => void

export type ReportFatalError = (msg: string) => (errors: Errors) => void

const reportParsingError = (logger: Logger): ReportFatalError => (msg) => (errors) => {
  logger.warn(msg, {
    errors: formatValidationErrors(errors),
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const instantiate = (logger: Logger) => {

  const r1 = collections.instantiate()
  const r2 = entries.instantiate()
  const r3 = comments.instantiate()
  const r4 = localTimeline.instantiate()
  const r5 = works.instantiate()
  const r6 = community.instantiate()

  const dispatch = (event: DomainEvent): void => {
    r1.handleEvent(event)
    r2.handleEvent(event)
    r3.handleEvent(event)
    r4.handleEvent(event)
    r5.handleEvent(event)
    r6.handleEvent(event)
  }

  const handleEvent: EventHandler = (event) => pipe(
    event,
    domainEvent.decode,
    E.match(
      reportParsingError(logger)('Could not parse event from EventStore'),
      dispatch,
    ),
  )

  const queries: Domain = {
    ...r1.queries,
    ...r2.queries,
    ...r3.queries,
    ...r4.queries,
    ...r5.queries,
    ...r6.queries,
  }

  return ({
    queries,
    handleEvent,
  })
}

