import { ResourceIdentifier } from './resource-identifier'

export const renderCommentIdentifier = (id: ResourceIdentifier['id']): ResourceIdentifier => ({
  type: 'comment',
  id,
})

