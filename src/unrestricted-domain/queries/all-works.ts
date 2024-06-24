import { Readmodel } from '../readmodel'
import { Work } from '../works/work'

export const allWorks = (currentState: Readmodel) => (): ReadonlyArray<Work> => Array.from(currentState.works.values())

