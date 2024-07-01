import { Readmodel } from '../state/readmodel'
import { TimelineEvent } from '../state/timeline-event'

type GLT = (currentState: Readmodel) => () => ReadonlyArray<TimelineEvent>

export const getLocalTimeline: GLT = (currentState) => () => currentState.activities

