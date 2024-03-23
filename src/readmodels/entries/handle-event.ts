import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

export const handleEvent = (state: Readmodel) => (event: DomainEvent): void => {
  switch (event.type) {
    case 'doi-entered':
      const data = event.data
      const current = state.byCollection.get(data.collectionId) ?? []
      current.push(data)
      state.byCollection.set(data.collectionId, current)
      state.byEntryId.set(data.id, data)
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

