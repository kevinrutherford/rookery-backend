import { JsonApiResource } from './json-api-resource'
import { renderCollectionIdentifier } from './render-collection-identifier'
import { renderDiscussionIdentifier } from './render-discussion-identifier'
import { renderWorkIdentifier } from './render-work-identifier'
import { Discussion } from '../../domain/index.open'

export const renderDiscussion = (discussion: Discussion): JsonApiResource => ({
  ...renderDiscussionIdentifier(discussion.id),
  attributes: {
    addedAt: discussion.addedAt.toISOString(),
    commentsCount: discussion.commentsCount,
    title: discussion.title,
  },
  relationships: {
    collection: { data: renderCollectionIdentifier(discussion.collectionId) },
    work: { data: renderWorkIdentifier(discussion.workId) },
  },
})

