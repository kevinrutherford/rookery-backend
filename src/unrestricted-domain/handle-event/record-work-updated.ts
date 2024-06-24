import { WorkUpdatedEvent } from '../domain-event'
import { Readmodel } from '../readmodel'

export const recordWorkUpdated = (state: Readmodel, event: WorkUpdatedEvent): void => {
  state.works.set(event.data.workId, {
    id: event.data.workId,
    updatedAt: event.created,
    frontMatter: event.data.attributes,
  })

  state.activities.push({
    event: {
      ...event,
      isPrivate: false,
    },
  })
}

