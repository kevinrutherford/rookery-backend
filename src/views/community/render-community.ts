import { renderCommunityIdentifier } from './render-community-identifier'
import { Community } from '../../domain-model/community/readmodel'
import { JsonApiResource } from '../json-api-resource'

export const renderCommunity = (community: Community): JsonApiResource => ({
  ...renderCommunityIdentifier(community.id),
  attributes: community,
})

