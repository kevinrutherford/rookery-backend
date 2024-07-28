import { JsonApiResource } from './json-api-resource'
import { renderMemberIdentifier } from './render-member-identifier'
import { renderWorkIdentifier } from './render-work-identifier'
import { WorkNotFound } from '../../domain/index.open'

export const renderWorkNotFoundUpdateResource = (update: WorkNotFound): JsonApiResource => ({
  type: update.type,
  id: update.id,
  attributes: {
    occurred_at: update.created.toISOString(),
  },
  relationships: {
    actor: { data: renderMemberIdentifier(update.actorId) }, // SMELL -- duplicated with other update renderer(s)
    work: { data: renderWorkIdentifier(update.workId) },
  },
})

