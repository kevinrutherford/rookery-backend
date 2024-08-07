import { includeMember } from './include-member'
import { includeWork } from './include-work'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, WorkNotFound } from '../../domain/index.open'
import { renderMemberIdentifier } from '../json-api/render-member-identifier'
import { renderWorkIdentifier } from '../json-api/render-work-identifier'

export const renderWorkNotFound = (queries: Domain, update: WorkNotFound): UpdateWithIncludes => ({
  data: {
    type: update.kind,
    id: update.id,
    attributes: {
      occurred_at: update.created.toISOString(),
    },
    relationships: {
      actor: { data: renderMemberIdentifier(update.actorId) },
      work: { data: renderWorkIdentifier(update.workId) },
    },
  },
  included: [
    includeMember(queries, update.actorId),
    includeWork(queries, update.workId),
  ],
})

