import * as O from 'fp-ts/Option'
import { getCommunity } from './get-community'
import { handleEvent } from './handle-event'
import { Readmodel } from './readmodel'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const instantiate = () => {
  const currentState: Readmodel = O.some({
    name: 'Health organisation, policy and economics (HOPE)',
    affiliation: 'Centre for Primary Care and Health Services Research, Manchester University',
    overview: `
        This interdisciplinary theme focuses upon research which investigates the supply, organisation, management and financing of health and social care services.

Our expertise encompasses rigorous econometric analysis and a wide range of qualitative social scientific methods, including particular experience in the use of ethnographic approaches to understand organisational processes.`,
  })

  return ({
    handleEvent: handleEvent(currentState),
    queries: {
      getCommunity: getCommunity(currentState),
    },
  })
}

