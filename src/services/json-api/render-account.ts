import { JsonApiResource } from './json-api-resource'
import { renderAccountIdentifier } from './render-account-identifier'
import { Account } from '../../domain/account-resource'

export const renderAccount = (account: Account): JsonApiResource => ({
  ...renderAccountIdentifier(account.id),
  attributes: {
    username: account.username,
    display_name: account.displayName,
    avatar_url: account.avatarUrl,
  },
})

