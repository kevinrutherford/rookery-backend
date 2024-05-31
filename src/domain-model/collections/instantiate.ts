import { allCollections } from './all-collections'
import { handleEvent } from './handle-event'
import { lookupCollection } from './lookup-collection'
import { Readmodel } from './readmodel'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const instantiate = () => {
  const currentState: Readmodel = new Map()

  return ({
    handleEvent: handleEvent(currentState),
    queries: {
      allCollections: allCollections(currentState),
      lookupCollection: lookupCollection(currentState),
    },
  })
}

