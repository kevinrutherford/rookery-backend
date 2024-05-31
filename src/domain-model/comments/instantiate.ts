import { findComments } from './find-comments'
import { handleEvent } from './handle-event'
import { Readmodel } from './readmodel'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const instantiate = () => {
  const currentState: Readmodel = new Map()

  return ({
    handleEvent: handleEvent(currentState),
    queries: {
      findComments: findComments(currentState),
    },
  })
}

