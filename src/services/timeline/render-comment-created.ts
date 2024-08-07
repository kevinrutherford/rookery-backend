import * as O from 'fp-ts/Option'
import { includeEntry } from './include-entry'
import { includeMember } from './include-member'
import { includeWork } from './include-work'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain } from '../../domain/index.open'
import { CommentCreated } from '../../domain/update-resource'
import { renderEntryIdentifier } from '../json-api/render-entry-identifier'
import { renderMemberIdentifier } from '../json-api/render-member-identifier'
import { renderWorkIdentifier } from '../json-api/render-work-identifier'

export const renderCommentCreated = (queries: Domain, update: CommentCreated): UpdateWithIncludes => ({
  data: O.some({
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
  }),
  included: [
    includeMember(queries, update.actorId),
    includeEntry(queries, update.entryId),
    includeWork(queries, update.workId),
  ],
})

