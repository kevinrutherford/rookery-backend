import { Readmodel } from './readmodel'
import { Domain } from '../../services/domain'

export const allCollections = (currentState: Readmodel): Domain['allCollections'] => () => (
  Array.from(currentState.values())
)

