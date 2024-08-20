import { MemberJoinedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordMemberJoined = (state: Readmodel, event: MemberJoinedEvent): void => {
  const memberId = event.data.id
  const existing = state.members.get(memberId)
  if (existing !== undefined) {
    state.info.unexpectedEvents.push(event)
    return
  }
  state.members.set(memberId, {
    ...event.data,
    following: [],
    cache: 'fetched' as const,
  })
}

