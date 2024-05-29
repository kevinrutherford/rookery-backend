import { ResourceIdentifier } from '../resource-identifier'

export const renderParagraphIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'timeline-paragraph',
  id,
})

