import { JsonApiResource } from './json-api-resource'
import { renderAccountIdentifier } from './render-account-identifier'
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
    actor: { data: renderAccountIdentifier(update.actor) }, // SMELL -- duplicated with other update renderer(s)
    work: { data: renderWorkIdentifier(update.workId) },
  },
})

