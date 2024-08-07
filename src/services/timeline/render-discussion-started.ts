import { includeCollection } from './include-collection'
import { includeMember } from './include-member'
import { includeWork } from './include-work'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain } from '../../domain/index.open'
import { DoiEntered } from '../../domain/update-resource'
import { renderCollectionIdentifier } from '../json-api/render-collection-identifier'
import { renderEntryIdentifier } from '../json-api/render-entry-identifier'
import { renderMemberIdentifier } from '../json-api/render-member-identifier'
import { renderWorkIdentifier } from '../json-api/render-work-identifier'

export const renderDiscussionStarted = (queries: Domain, update: DoiEntered): UpdateWithIncludes => ({
  data: {
    type: 'update:doi-entered',
    id: update.id,
    attributes: {
      occurred_at: update.created.toISOString(),
    },
    relationships: {
      actor: { data: renderMemberIdentifier(update.actorId) },
      collection: { data: renderCollectionIdentifier(update.collectionId) },
      entry: { data: renderEntryIdentifier(update.entryId) },
      work: { data: renderWorkIdentifier(update.workId) },
    },
  },
  included: [
    includeMember(queries, update.actorId),
    includeCollection(queries, update.collectionId),
    includeWork(queries, update.workId),
  ],
})

