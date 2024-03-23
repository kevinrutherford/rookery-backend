import { Readmodel, TimelineEvent } from './readmodel'

export const getLocalTimeline = (currentState: Readmodel) => (): ReadonlyArray<TimelineEvent> => currentState

