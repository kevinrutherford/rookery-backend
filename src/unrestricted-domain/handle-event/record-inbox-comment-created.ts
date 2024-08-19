import { InboxCommentCreatedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordInboxCommentCreated = (state: Readmodel, event: InboxCommentCreatedEvent): void => {
  state.inbox.push({
    kind: 'inbox-update:comment-created',
    id: event.data.id,
    created: event.data.publishedAt,
    actorId: event.data.actorId,
    occurredWithinPrivateCollection: false,
    actor: {
      id: event.data.actorId,
      username: '@voldemort@rookery-1.xpsurgery.com',
      displayName: 'He who shall not be named',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Lordvoldemort.jpg',
      following: [],
      cache: 'fetched', // SMELL -- incorrect coupling
    },
    work: {
      id: '10.7554%2Felife.80483',
      doi: '10.7554/elife.80483',
      updatedAt: new Date(),
      frontMatter: {
        crossrefStatus: 'found',
        title: 'Some paper about poisons',
        abstract: '', // SMELL -- should not be needed for the feed
        authors: [], // SMELL -- should not be needed for the feed
      },
    },
    discussion: {
      id: event.data.entryId,
      collectionId: 'poisons',
      workId: '10.7554%2Felife.80483',
      addedAt: new Date(),
      title: 'Unknown',
      commentsCount: 0, // SMELL -- should not be needed for the feed
    },
  })
}

