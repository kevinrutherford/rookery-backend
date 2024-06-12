import { renderCommunityIdentifier } from './render-community-identifier'
import { JsonApiResource } from '../json-api-resource'
import { Community } from '../queries'

export const renderCommunity = (community: Community): JsonApiResource => ({
  ...renderCommunityIdentifier(community.id),
  attributes: community,
})

