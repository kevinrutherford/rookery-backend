import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Readmodel, TimelineEvent } from './readmodel'

type GLT = (currentState: Readmodel)
=> (includePrivateCollectionActivities: boolean)
=> ReadonlyArray<TimelineEvent>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getLocalTimeline: GLT = (currentState) => (includePrivateCollectionActivities) => pipe(
  currentState,
  RA.map((item) => item.event),
)

