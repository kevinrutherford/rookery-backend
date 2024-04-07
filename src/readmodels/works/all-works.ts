import { Readmodel } from './readmodel'
import { Work } from './work'

export const allWorks = (currentState: Readmodel) => (): ReadonlyArray<Work> => {
  return Array.from(currentState.values())
}

