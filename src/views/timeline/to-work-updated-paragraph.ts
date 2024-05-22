import * as O from 'fp-ts/Option'
import { TimelineParagraph } from './timeline-paragraph'
import { WorkUpdated } from '../../readmodels/local-timeline/readmodel'

// eslint-disable-next-line consistent-return
export const toWorkUpdatedParagraph = (event: WorkUpdated): O.Option<TimelineParagraph> => {
  switch (event.data.attributes.crossrefStatus) {
    case 'not-determined':
      return O.none
    case 'not-found':
      return O.some({
        userHandle: 'CrossrefBot',
        action: 'could not find a DOI',
        content: event.data.workId,
        timestamp: event.created,
      })
    case 'found':
      return O.some({
        userHandle: 'CrossrefBot',
        action: 'found the title of a paper',
        content: event.data.attributes.title,
        timestamp: event.created,
      })
  }
}

