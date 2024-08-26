import { ResourceIdentifier } from '../services/json-api/resource-identifier'

export type Member = {
  id: string,
  username: string,
  displayName: string,
  avatarUrl: string,
  followers: Array<ResourceIdentifier>,
  following: Array<ResourceIdentifier>,
  cache: 'fetching' | 'fetched',
}

