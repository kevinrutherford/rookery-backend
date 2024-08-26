import { JsonApiResource } from './json-api-resource'
import { renderFollowerIdentifier } from './render-follower-identifier'

export const renderFollower = (followerInboxUrl: string): JsonApiResource => ({
  ...renderFollowerIdentifier(followerInboxUrl),
  attributes: {
    inboxUrl: followerInboxUrl,
  },
})

