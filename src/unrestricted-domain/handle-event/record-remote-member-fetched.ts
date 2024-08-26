import { RemoteMemberFetchedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordRemoteMemberFetched = (state: Readmodel, event: RemoteMemberFetchedEvent): void => {
  const memberId = event.data.id
  const existing = state.members.get(memberId)
  if (existing !== undefined) {
    state.info.unexpectedEvents.push(event)
    return
  }
  state.members.set(memberId, {
    id: event.data.id,
    username: event.data.attributes.username,
    displayName: event.data.attributes.display_name,
    avatarUrl: event.data.attributes.avatar_url,
    followers: [],
    following: [],
    cache: 'fetched' as const,
  })
}

