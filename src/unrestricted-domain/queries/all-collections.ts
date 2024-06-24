import { Domain } from '../../domain/index.open'
import { Readmodel } from '../readmodel'

export const allCollections = (currentState: Readmodel): Domain['allCollections'] => () => (
  Array.from(currentState.collections.values())
)

