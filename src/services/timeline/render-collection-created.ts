import { includeCollection } from './include-collection'
import { includeMember } from './include-member'
import { UpdateWithIncludes } from './update-with-includes'
import { Domain } from '../../domain/index.open'
import { CollectionCreated } from '../../domain/update-resource'
import { renderCollectionIdentifier } from '../json-api/render-collection-identifier'
import { renderMemberIdentifier } from '../json-api/render-member-identifier'

export const renderCollectionCreated = (queries: Domain, update: CollectionCreated): UpdateWithIncludes => ({
  data: {
    type: 'update:collection-created',
    id: update.id,
    attributes: {
      occurred_at: update.created.toISOString(),
    },
    relationships: {
      actor: { data: renderMemberIdentifier(update.actorId) },
      collection: { data: renderCollectionIdentifier(update.collectionId) },
    },
  },
  included: [
    includeMember(queries, update.actorId),
    includeCollection(queries, update.collectionId),
  ],
})

