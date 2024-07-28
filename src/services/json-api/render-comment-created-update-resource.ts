import { JsonApiResource } from './json-api-resource'
import { renderEntryIdentifier } from './render-entry-identifier'
import { renderMemberIdentifier } from './render-member-identifier'
import { renderWorkIdentifier } from './render-work-identifier'
import { CommentCreated } from '../../domain/index.open'

export const renderCommentCreatedUpdateResource = (update: CommentCreated): JsonApiResource => ({
  type: update.type,
  id: update.id,
  attributes: {
    occurred_at: update.created.toISOString(),
  },
  relationships: {
    actor: { data: renderMemberIdentifier(update.actorId) },
    entry: { data: renderEntryIdentifier(update.entryId) },
    work: { data: renderWorkIdentifier(update.workId) },
  },
})

