import { renderWorkIdentifier } from './render-work-identifier'
import { Work } from '../../domain-model/works/work'
import { JsonApiResource } from '../json-api-resource'

export const renderWork = (work: Work): JsonApiResource => ({
  ...renderWorkIdentifier(work.id),
  attributes: {
    ...work.frontMatter,
    updatedAt: work.updatedAt.toISOString(),
  },
})

