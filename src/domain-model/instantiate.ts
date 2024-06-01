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

  const handleEvent = (event: unknown): void => {
    const x = event as DomainEvent // SMELL: use a codec here?
    r1.handleEvent(x)
    r2.handleEvent(x)
    r3.handleEvent(x)
    r4.handleEvent(x)
    r5.handleEvent(x)
    r6.handleEvent(x)
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

