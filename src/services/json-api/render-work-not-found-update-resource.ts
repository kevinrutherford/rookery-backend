import { JsonApiResource } from './json-api-resource'
import { renderWorkIdentifier } from './render-work-identifier'
import { WorkNotFound } from '../../domain/index.open'

export const renderWorkNotFoundUpdateResource = (update: WorkNotFound): JsonApiResource => ({
  type: update.type,
  id: update.id,
  attributes: {
    actor: update.actor, // SMELL -- should be an included resource
    occurred_at: update.created.toISOString(),
  },
  relationships: {
    work: { data: renderWorkIdentifier(update.workId) },
  },
})

