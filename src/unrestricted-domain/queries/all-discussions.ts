import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

export const allDiscussions = (currentState: Readmodel): Domain['allDiscussions'] => () => (
  Array.from(currentState.discussionsByDiscussionId.values())
)

