import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

export const allCollections = (currentState: Readmodel): Domain['allCollections'] => () => (
  Array.from(currentState.collections.values())
)

