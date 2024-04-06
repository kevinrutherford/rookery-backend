import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

export const handleEvent = (state: Readmodel) => (event: DomainEvent): void => {
  switch (event.type) {
    case 'doi-entered':
      const data = event.data
      const entry = {
        ...data,
        addedAt: event.created,
        commentsCount: 0,
      }
      const current = state.byCollection.get(data.collectionId) ?? []
      current.push(entry)
      state.byCollection.set(data.collectionId, current)
      state.byEntryId.set(data.id, entry)
      return
    case 'comment-created':
      const comment = event.data
      const existingEntry = state.byEntryId.get(comment.entryId)
      if (existingEntry)
        existingEntry.commentsCount = existingEntry.commentsCount + 1
      return
    default:
      return
  }
}

