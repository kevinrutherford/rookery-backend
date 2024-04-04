import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

export const handleEvent = (state: Readmodel) => (event: DomainEvent): void => {
  switch (event.type) {
    case 'doi-entered':
      const data = event.data
      const entry = {
        ...data,
        addedAt: event.created,
      }
      const current = state.byCollection.get(data.collectionId) ?? []
      current.push({
        ...entry,
        commentsCount: 0,
      })
      state.byCollection.set(data.collectionId, current)
      state.byEntryId.set(data.id, {
        ...entry,
        commentsCount: 0,
      })
      return
    case 'front-matter-added':
      const payload = event.data
      const x = state.byEntryId.get(payload.entryId)
      if (x)
        x.frontMatter = payload.frontMatter
      return
    default:
      return
  }
}

