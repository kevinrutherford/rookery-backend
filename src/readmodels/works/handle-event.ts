import { Readmodel } from './readmodel'
import { DomainEvent } from '../domain-event'

export const handleEvent = (state: Readmodel) => (event: DomainEvent): void => {
  if (event.type === 'doi-entered') {
    const existing = state.get(event.data.workId)
    if (!existing) {
      state.set(event.data.workId, {
        id: event.data.workId,
        frontMatter: {
          crossrefStatus: 'not-determined',
        },
      })
    }
  } else if (event.type === 'work-updated') {
    state.set(event.data.workId, {
      id: event.data.workId,
      frontMatter: event.data.attributes,
    })
  }
}

