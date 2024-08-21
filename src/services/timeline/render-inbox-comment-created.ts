import * as O from 'fp-ts/Option'
import { includeMember } from './include-member'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain } from '../../domain/index.open'
import { InboxCommentCreated } from '../../domain/update-resource'
import { renderDiscussion } from '../json-api/render-discussion'
import { renderDiscussionIdentifier } from '../json-api/render-discussion-identifier'
import { renderMemberIdentifier } from '../json-api/render-member-identifier'

export const renderInboxCommentCreated = (queries: Domain, update: InboxCommentCreated): UpdateWithIncludes => ({
  data: {
    type: update.kind,
    id: update.id,
    attributes: {
      occurred_at: update.created.toISOString(),
    },
    relationships: {
      actor: { data: renderMemberIdentifier(update.actorId) },
      entry: { data: renderDiscussionIdentifier(update.discussion.id) },
    },
  },
  included: [
    includeMember(queries, update.actorId),
    O.some(renderDiscussion(update.discussion)),
  ],
})

