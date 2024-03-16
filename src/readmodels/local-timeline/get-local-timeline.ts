import { Readmodel } from './readmodel'
import { TimelineEvent } from './timeline-event'

type GetLocalTimeline = (currentState: Readmodel)
=> ()
=> ReadonlyArray<TimelineEvent>

export const getLocalTimeline: GetLocalTimeline = (currentState) => () => currentState

