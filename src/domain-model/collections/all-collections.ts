import { Readmodel } from './readmodel'
import { Queries } from '../../views/queries'

export const allCollections = (currentState: Readmodel): Queries['allCollections'] => () => (
  Array.from(currentState.values())
)

