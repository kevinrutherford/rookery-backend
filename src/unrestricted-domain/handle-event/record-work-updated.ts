import { recordUpdate } from './record-update'
import { FrontMatterFetched, WorkNotFound } from '../../domain/index.open'
import { WorkUpdatedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordWorkUpdated = (state: Readmodel, event: WorkUpdatedEvent): void => {
  const currentWork = state.works.get(event.data.workId)
  if (currentWork === undefined) {
    state.info.unexpectedEvents.push(event)
    return
  }
  state.works.set(event.data.workId, {
    ...currentWork,
    updatedAt: event.created,
    frontMatter: event.data.attributes,
  })

  if (event.data.attributes.crossrefStatus === 'found') {
    recordUpdate(state, {
      kind: 'update:front-matter-found',
      id: event.id,
      created: event.created,
      actorId: event.data.actorId,
      occurredWithinPrivateCollection: false,
      workId: event.data.workId,
    } satisfies FrontMatterFetched)
  } else if (event.data.attributes.crossrefStatus === 'not-found') {
    recordUpdate(state, {
      kind: 'update:work-not-found',
      id: event.id,
      created: event.created,
      actorId: event.data.actorId,
      occurredWithinPrivateCollection: false,
      workId: event.data.workId,
    } satisfies WorkNotFound)
  }
}

