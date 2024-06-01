import * as collections from './collections'
import * as comments from './comments'
import * as community from './community'
import { DomainEvent } from './domain-event'
import * as entries from './entries'
import * as localTimeline from './local-timeline'
import * as works from './works'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const instantiate = () => {

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

  const handleEvent = (event: unknown): void => {
    const x = event as DomainEvent // SMELL: use a codec here?
    dispatch(x)
  }

  const queries = {
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

export type Queries = ReturnType<typeof instantiate>['queries']

