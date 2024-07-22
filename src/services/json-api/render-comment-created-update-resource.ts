import { JsonApiResource } from './json-api-resource'
import { renderAccountIdentifier } from './render-account-identifier'
import { renderEntryIdentifier } from './render-entry-identifier'
import { renderWorkIdentifier } from './render-work-identifier'
import { CommentCreated } from '../../domain/index.open'

export const renderCommentCreatedUpdateResource = (update: CommentCreated): JsonApiResource => ({
  type: update.type,
  id: update.id,
  attributes: {
    content: update.content, // SMELL -- shouldn't be needed now
    occurred_at: update.created.toISOString(),
  },
  relationships: {
    actor: { data: renderAccountIdentifier(update.actorId) },
    entry: { data: renderEntryIdentifier(update.entryId) },
    work: { data: renderWorkIdentifier(update.workId) },
  },
})

