import * as O from 'fp-ts/Option'
import { getCommunity } from './get-community'
import { handleEvent } from './handle-event'
import { Readmodel } from './readmodel'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const instantiate = () => {
  const currentState: Readmodel = {
    data: O.none,
  }

  return ({
    handleEvent: handleEvent(currentState),
    queries: {
      getCommunity: getCommunity(currentState),
    },
  })
}

