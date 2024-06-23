import { DoiEnteredEvent } from '../domain-event'
import { Readmodel } from '../readmodel'

export const recordDoiEntered = (state: Readmodel, event: DoiEnteredEvent): void => {
  if (state.collections.get(event.data.collectionId) === undefined)
    state.info.unexpectedEvents.push(event)
  else {
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
  }
}

