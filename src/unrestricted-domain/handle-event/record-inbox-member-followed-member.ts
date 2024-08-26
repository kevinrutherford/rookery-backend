import { InboxMemberFollowedMemberEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordInboxMemberFollowedMember = (state: Readmodel, event: InboxMemberFollowedMemberEvent): void => {
  const localMemberId = event.data.localMemberId
  const localMember = state.members.get(localMemberId)
  if (localMember === undefined) {
    state.info.unexpectedEvents.push(event)
    return
  }
  const followers = state.followers.get(localMemberId) ?? []
  followers.push(event.data.remoteActorUrl)
  state.followers.set(localMemberId, followers)
}

