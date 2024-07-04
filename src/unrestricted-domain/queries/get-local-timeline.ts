import { Update } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

type GLT = (currentState: Readmodel) => () => ReadonlyArray<Update>

export const getLocalTimeline: GLT = (currentState) => () => currentState.activities

