import { WorkUpdatedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordWorkUpdated = (state: Readmodel, event: WorkUpdatedEvent): void => {
  state.works.set(event.data.workId, {
    id: event.data.workId,
    updatedAt: event.created,
    frontMatter: event.data.attributes,
  })

  if (event.data.attributes.crossrefStatus !== 'not-determined') {
    state.activities.push({
      ...event,
      occurredWithinPrivateCollection: false,
    })
  }
}

