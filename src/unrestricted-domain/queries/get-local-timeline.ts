import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Readmodel } from '../state/readmodel'
import { TimelineEvent } from '../state/timeline-event'

type GLT = (currentState: Readmodel) => () => ReadonlyArray<TimelineEvent>

export const getLocalTimeline: GLT = (currentState) => () => pipe(
  currentState.activities,
  RA.map((item) => item.event),
)

