import { cacheActor } from './cache-actor'
import { Entry } from '../../domain/index.open'
import { DoiEnteredEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordDoiEntered = (state: Readmodel, event: DoiEnteredEvent): void => {
  const collection = state.collections.get(event.data.collectionId)
  if (collection === undefined) {
    state.info.unexpectedEvents.push(event)
    return
  }
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
  const entry: Entry = {
    id: event.data.entryId,
    collectionId: event.data.collectionId,
    workId,
    addedAt: event.created,
    commentsCount: 0,
  }
  const current = state.entriesByCollection.get(data.collectionId) ?? []
  current.push(entry)
  state.entriesByCollection.set(data.collectionId, current)
  state.entriesByEntryId.set(data.entryId, entry)

  state.activities.push({
    type: event.type,
    id: event.id,
    created: event.created,
    actorId: event.data.actorId,
    occurredWithinPrivateCollection: collection.isPrivate,
    collectionId: event.data.collectionId,
    workId,
  })
  cacheActor(state, event.data.actorId) // SMELL -- duplicated for all events
}

