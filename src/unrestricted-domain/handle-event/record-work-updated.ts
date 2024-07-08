import { FrontMatterFound, WorkNotFound } from '../../domain/update-resource'
import { WorkUpdatedEvent } from '../domain-event'
import { Readmodel } from '../state/readmodel'

export const recordWorkUpdated = (state: Readmodel, event: WorkUpdatedEvent): void => {
  state.works.set(event.data.workId, {
    id: event.data.workId,
    updatedAt: event.created,
    frontMatter: event.data.attributes,
  })

  if (event.data.attributes.crossrefStatus === 'found') {
    state.activities.push({
      type: 'update:front-matter-found',
      id: event.id,
      created: event.created,
      actor: 'CrossrefBot',
      occurredWithinPrivateCollection: false,
      workId: event.data.workId,
      title: event.data.attributes.title, // SMELL -- maybe not needed if the Work is via a relationship?
      abstract: event.data.attributes.abstract, // SMELL -- maybe not needed if the Work is via a relationship?
      authors: event.data.attributes.authors, // SMELL -- maybe not needed if the Work is via a relationship?
    } satisfies FrontMatterFound)
  } else if (event.data.attributes.crossrefStatus === 'not-found') {
    state.activities.push({
      type: 'update:work-not-found',
      id: event.id,
      created: event.created,
      actor: 'CrossrefBot',
      occurredWithinPrivateCollection: false,
      workId: event.data.workId,
    } satisfies WorkNotFound)
  }
}

