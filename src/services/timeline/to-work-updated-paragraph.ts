import * as O from 'fp-ts/Option'
import { Activity, WorkUpdated } from '../../domain/index.open'

// eslint-disable-next-line consistent-return
export const toWorkUpdatedParagraph = (activity: WorkUpdated): O.Option<Activity> => {
  switch (activity.data.attributes.crossrefStatus) { // SMELL: this should be done in the domain
    case 'not-determined':
      return O.none
    case 'not-found':
      return O.some({
        id: activity.id,
        actor: activity.actor,
        action: 'could not find a DOI',
        content: activity.data.workId,
        occurred_at: activity.created,
      })
    case 'found':
      return O.some({
        id: activity.id,
        actor: activity.actor,
        action: 'found the title of a paper',
        content: activity.data.attributes.title,
        occurred_at: activity.created,
      })
  }
}

