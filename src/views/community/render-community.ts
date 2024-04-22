import { Community } from '../../readmodels/community/readmodel'
import { JsonApiResource } from '../json-api-resource'

export const renderCommunity = (community: Community): JsonApiResource => ({
  type: 'community',
  id: '1',
  attributes: community,
})

