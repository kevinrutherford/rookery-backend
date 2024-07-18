import { JsonApiResource } from './json-api-resource'
import { renderAccountIdentifier } from './render-account-identifier'
import { renderCommunityIdentifier } from './render-community-identifier'
import { renderEntryIdentifier } from './render-entry-identifier'
import { renderUpdateIdentifier } from './render-update-identifier'
import { renderWorkIdentifier } from './render-work-identifier'
import { Activity } from '../../domain/index.open'

export const renderUpdateResource = (update: Activity): JsonApiResource => {
  switch (update.type) {
    case 'update:comment-created':
      return ({
        type: update.type,
        id: update.id,
        attributes: {
          content: update.content,
          occurred_at: update.occurred_at.toISOString(),
        },
        relationships: {
          actor: { data: renderAccountIdentifier(update.accountId) },
          entry: { data: renderEntryIdentifier(update.entryId) },
          work: { data: renderWorkIdentifier(update.workId) },
        },
      })
    case 'update:community-created':
      return ({
        type: update.type,
        id: update.id,
        attributes: {
          occurred_at: update.occurred_at.toISOString(),
        },
        relationships: {
          actor: { data: renderAccountIdentifier(update.accountId) },
          community: { data: renderCommunityIdentifier(update.communityId) },
        },
      })
    default:
      return ({
        ...renderUpdateIdentifier(update.id),
        attributes: {
          action: update.action,
          content: update.content,
          occurred_at: update.occurred_at.toISOString(),
        },
        relationships: {
          actor: { data: renderAccountIdentifier(update.accountId) },
        },
      })
  }
}

