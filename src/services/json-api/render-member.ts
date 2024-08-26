import { JsonApiResource } from './json-api-resource'
import { renderMemberIdentifier } from './render-member-identifier'
import { Member } from '../../domain/member-resource'

export const renderMember = (member: Member): JsonApiResource => ({
  ...renderMemberIdentifier(member.id),
  attributes: {
    username: member.username,
    display_name: member.displayName,
    avatar_url: member.avatarUrl,
    followingCount: member.following.length,
  },
  relationships: {
    followers: {
      links: {
        related: `/members/${member.id}/followers`,
      },
      meta: {
        count: member.followers.length,
      },
    },
  },
})

