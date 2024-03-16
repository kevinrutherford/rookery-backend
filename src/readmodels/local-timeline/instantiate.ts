import { getLocalTimeline } from './get-local-timeline'
import { handleEvent } from './handle-event'
import { Readmodel } from './readmodel'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const instantiate = () => {
  const currentState: Readmodel = []

  return ({
    handleEvent: handleEvent(currentState),
    queries: {
      getLocalTimeline: getLocalTimeline(currentState),
    },
  })
}

