import { ResourceIdentifier } from '../services/json-api/resource-identifier'

export type Member = {
  id: string,
  username: string,
  displayName: string,
  avatarUrl: string,
  following: Array<ResourceIdentifier>,
}

