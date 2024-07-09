import { JsonApiResource } from './json-api-resource'
import { renderWorkIdentifier } from './render-work-identifier'
import { WorkNotFoundUpdate } from '../../domain/activity-resource'

export const renderWorkNotFoundUpdateResource = (update: WorkNotFoundUpdate): JsonApiResource => ({
  type: update.type,
  id: update.id,
  attributes: {
    actor: update.actor, // SMELL -- should be an included resource
    occurred_at: update.occurred_at.toISOString(),
  },
  relationships: {
    work: { data: renderWorkIdentifier(update.workId) },
  },
})

