import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Readmodel, TimelineEvent } from './readmodel'

type GLT = (currentState: Readmodel)
=> ()
=> ReadonlyArray<TimelineEvent>

export const getLocalTimeline: GLT = (currentState) => () => pipe(
  currentState,
  RA.map((item) => item.event),
)

