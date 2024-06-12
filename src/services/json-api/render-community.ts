import { JsonApiResource } from './json-api-resource'
import { renderCommunityIdentifier } from './render-community-identifier'
import { Community } from '../community-resource'

export const renderCommunity = (community: Community): JsonApiResource => ({
  ...renderCommunityIdentifier(community.id),
  attributes: community,
})

