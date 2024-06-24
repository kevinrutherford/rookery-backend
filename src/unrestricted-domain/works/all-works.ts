import { Work } from './work'
import { Readmodel } from '../readmodel'

export const allWorks = (currentState: Readmodel) => (): ReadonlyArray<Work> => Array.from(currentState.works.values())

