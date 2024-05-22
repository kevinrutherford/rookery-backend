import { Collection } from './collection'
import { Readmodel } from './readmodel'

export const allCollections = (currentState: Readmodel) => (): ReadonlyArray<Collection> => (
  Array.from(currentState.values())
)

