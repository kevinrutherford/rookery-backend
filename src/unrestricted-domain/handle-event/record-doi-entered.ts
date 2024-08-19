import { recordUpdate } from './record-update'
import { Discussion } from '../../domain/index.open'
import { renderDiscussionIdentifier } from '../../services/json-api/render-discussion-identifier'
import { DoiEnteredEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordDoiEntered = (state: Readmodel, event: DoiEnteredEvent): void => {
  const collection = state.collections.get(event.data.collectionId)
  if (collection === undefined) {
    state.info.unexpectedEvents.push(event)
    return
  }
  collection.discussionCount += 1
  const workId = event.data.doi
  const existingWork = state.works.get(workId)
  if (!existingWork) {
    state.works.set(workId, {
      id: workId,
      doi: event.data.doi,
      updatedAt: event.created,
      frontMatter: {
        crossrefStatus: 'not-determined',
        reason: 'never-fetched',
      },
    })
  }

  const data = event.data
  const discussion: Discussion = {
    id: event.data.entryId,
    collectionId: event.data.collectionId,
    workId,
    addedAt: event.created,
    title: `DOI ${event.data.doi}`,
    commentsCount: 0,
  }
  const current = state.discussionsByCollection.get(data.collectionId) ?? []
  current.push(discussion)
  state.discussionsByCollection.set(data.collectionId, current)
  state.discussionsByEntryId.set(data.entryId, discussion)

  const actorId = event.data.actorId
  recordUpdate(state, {
    kind: 'update:doi-entered',
    id: event.id,
    created: event.created,
    actorId,
    occurredWithinPrivateCollection: collection.isPrivate,
    collectionId: event.data.collectionId,
    entryId: event.data.entryId,
    workId,
  })

  const actor = state.members.get(actorId)
  if (actor !== undefined) {
    const followings = actor.following
    state.members.set(actorId, {
      ...actor,
      following: [
        ...followings,
        renderDiscussionIdentifier(event.data.entryId),
      ],
    })
  }
}

