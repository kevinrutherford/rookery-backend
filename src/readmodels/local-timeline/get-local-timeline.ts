import { Readmodel, TimelineEvent } from './readmodel'

type GLT = (currentState: Readmodel) => (isAuthenticated: boolean) => ReadonlyArray<TimelineEvent>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getLocalTimeline: GLT = (currentState) => (isAuthenticated) => currentState

