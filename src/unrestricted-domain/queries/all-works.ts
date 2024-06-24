import { Readmodel } from '../state/readmodel'
import { Work } from '../state/work'

export const allWorks = (currentState: Readmodel) => (): ReadonlyArray<Work> => Array.from(currentState.works.values())

