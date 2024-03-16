import * as A from 'fp-ts/Array'
import * as D from 'fp-ts/Date'
import * as Ord from 'fp-ts/Ord'
import { pipe } from 'fp-ts/function'
import { Readmodel } from './readmodel'
import { TimelineEvent } from './timeline-event'

const byDate: Ord.Ord<TimelineEvent> = pipe(
  D.Ord,
  Ord.contramap((event) => event.timestamp),
)

const byDateDescending: Ord.Ord<TimelineEvent> = pipe(
  byDate,
  Ord.reverse,
)

type GetLocalTimeline = (currentState: Readmodel)
=> ()
=> ReadonlyArray<{
  userHandle: string,
  timestamp: string,
  action: string,
  content: string,
}>

export const getLocalTimeline: GetLocalTimeline = (currentState) => () => pipe(
  currentState,
  A.sort(byDateDescending),
  A.map((item) => ({
    ...item,
    timestamp: item.timestamp.toISOString(),
  })),
)

