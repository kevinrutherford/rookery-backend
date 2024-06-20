import { Readmodel } from './readmodel'
import { Domain } from '../../domain/index.open'

export const allCollections = (currentState: Readmodel): Domain['allCollections'] => () => (
  Array.from(currentState.values())
)

