import { includeDiscussion } from './include-discussion'
import { includeMember } from './include-member'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain } from '../../domain/index.open'
import { CommentCreated } from '../../domain/update-resource'
import { renderDiscussionIdentifier } from '../json-api/render-discussion-identifier'
import { renderMemberIdentifier } from '../json-api/render-member-identifier'

export const renderCommentCreated = (queries: Domain, update: CommentCreated): UpdateWithIncludes => ({
  data: {
    type: update.kind,
    id: update.id,
    attributes: {
      occurred_at: update.created.toISOString(),
    },
    relationships: {
      actor: { data: renderMemberIdentifier(update.actorId) },
      entry: { data: renderDiscussionIdentifier(update.entryId) },
    },
  },
  included: [
    includeMember(queries, update.actorId),
    includeDiscussion(queries, update.entryId),
  ],
})

