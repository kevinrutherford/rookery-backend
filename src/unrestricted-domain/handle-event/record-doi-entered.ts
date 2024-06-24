import { DoiEnteredEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordDoiEntered = (state: Readmodel, event: DoiEnteredEvent): void => {
  if (state.collections.get(event.data.collectionId) === undefined) {
    state.info.unexpectedEvents.push(event)
    return
  }
  const existing = state.works.get(event.data.workId)
  if (!existing) {
    state.works.set(event.data.workId, {
      id: event.data.workId,
      updatedAt: event.created,
      frontMatter: {
        crossrefStatus: 'not-determined',
        reason: 'never-fetched',
      },
    })
  }

  const data = event.data
  const entry = {
    ...data,
    addedAt: event.created,
    commentsCount: 0,
  }
  const current = state.entriesByCollection.get(data.collectionId) ?? []
  current.push(entry)
  state.entriesByCollection.set(data.collectionId, current)
  state.entriesByEntryId.set(data.id, entry)

  state.activities.push({
    event: {
      ...event,
      isPrivate: false,
    },
  })
}

