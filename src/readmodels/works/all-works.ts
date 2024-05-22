import { Readmodel } from './readmodel'
import { Work } from './work'

export const allWorks = (currentState: Readmodel) => (): ReadonlyArray<Work> => Array.from(currentState.values())

