import { recordUpdate } from './record-update'
import { FrontMatterFetched, WorkNotFound } from '../../domain/index.open'
import { WorkUpdatedEvent } from '../domain-event'
import { findDiscussionsAboutWork } from '../queries/find-discussions-about-work'
import { Readmodel } from '../state/readmodel'

export const recordWorkUpdated = (state: Readmodel, event: WorkUpdatedEvent): void => {
  const currentWork = state.works.get(event.data.workId)
  if (currentWork === undefined) {
    state.info.unexpectedEvents.push(event)
    return
  }
  const frontMatter = event.data.attributes
  state.works.set(event.data.workId, {
    ...currentWork,
    updatedAt: event.created,
    frontMatter,
  })

  if (frontMatter.crossrefStatus === 'found') {
    findDiscussionsAboutWork(state)(currentWork.id).forEach((discussion) => {
      discussion.title = frontMatter.title
    })
    recordUpdate(state, {
      kind: 'update:front-matter-found',
      id: event.id,
      created: event.created,
      actorId: event.data.actorId,
      occurredWithinPrivateCollection: false,
      workId: event.data.workId,
    } satisfies FrontMatterFetched)
  } else if (frontMatter.crossrefStatus === 'not-found') {
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

