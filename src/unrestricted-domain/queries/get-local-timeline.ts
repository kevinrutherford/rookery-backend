import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { TimelineEvent } from '../local-timeline/readmodel'
import { Readmodel } from '../readmodel'

type GLT = (currentState: Readmodel) => () => ReadonlyArray<TimelineEvent>

export const getLocalTimeline: GLT = (currentState) => () => pipe(
  currentState.activities,
  RA.map((item) => item.event),
)

