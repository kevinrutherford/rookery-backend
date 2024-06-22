import * as O from 'fp-ts/Option'
import { Activity, WorkUpdated } from '../../domain/index.open'

// eslint-disable-next-line consistent-return
export const toWorkUpdatedParagraph = (event: WorkUpdated): O.Option<Activity> => {
  switch (event.data.attributes.crossrefStatus) { // SMELL: this should be done in the domain
    case 'not-determined':
      return O.none
    case 'not-found':
      return O.some({
        id: event.id,
        userHandle: 'CrossrefBot',
        action: 'could not find a DOI',
        content: event.data.workId,
        timestamp: event.created,
      })
    case 'found':
      return O.some({
        id: event.id,
        userHandle: 'CrossrefBot',
        action: 'found the title of a paper',
        content: event.data.attributes.title,
        timestamp: event.created,
      })
  }
}

