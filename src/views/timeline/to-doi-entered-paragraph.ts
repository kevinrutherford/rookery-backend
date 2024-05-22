import { sequenceS } from 'fp-ts/Apply'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { TimelineParagraph } from './timeline-paragraph'
import { Queries } from '../../readmodels'
import { DoiEntered } from '../../readmodels/local-timeline/readmodel'
import { Work } from '../../readmodels/works/work'

// eslint-disable-next-line consistent-return
const titleOf = (work: Work) => {
  switch (work.frontMatter.crossrefStatus) {
    case 'not-determined':
    case 'not-found':
      return work.id
    case 'found':
      return work.frontMatter.title
  }
}

export const toDoiEnteredParagraph = (queries: Queries) => (event: DoiEntered): O.Option<TimelineParagraph> => pipe(
  {
    collection: queries.lookupCollection(event.data.collectionId),
    work: queries.lookupWork(event.data.workId),
  },
  sequenceS(O.Apply),
  O.map(({ collection, work }) => ({
    userHandle: 'you',
    action: `added an item to collection ${collection.name}`,
    content: titleOf(work),
    timestamp: event.created,
  })),
)

