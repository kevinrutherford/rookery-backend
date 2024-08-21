import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

export const allMembers = (currentState: Readmodel): Domain['allMembers'] => () => (
  Array.from(currentState.members.values())
)

