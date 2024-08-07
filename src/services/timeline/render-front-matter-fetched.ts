import { includeMember } from './include-member'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain, FrontMatterFetched } from '../../domain/index.open'
import { renderMemberIdentifier } from '../json-api/render-member-identifier'
import { renderWorkIdentifier } from '../json-api/render-work-identifier'

export const renderFrontMatterFetched = (queries: Domain, update: FrontMatterFetched): UpdateWithIncludes => ({
  data: {
    type: 'update:front-matter-fetched',
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
  ],
})

