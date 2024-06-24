import * as O from 'fp-ts/Option'
import { CommunityCreatedEvent } from '../domain-event'
import { Readmodel } from '../readmodel'

export const recordCommunityCreated = (state: Readmodel, event: CommunityCreatedEvent): void => {
  state.community = O.some(event.data)
}

