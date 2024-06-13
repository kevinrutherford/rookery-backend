import { sequenceS } from 'fp-ts/Apply'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Queries } from '../../unrestricted-domain'
import { Work } from '../../unrestricted-domain/works/work'
import { Activity } from '../activity-resource'
import { DoiEntered } from '../queries'

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

export const toDoiEnteredParagraph = (queries: Queries) => (event: DoiEntered): O.Option<Activity> => pipe(
  {
    collection: pipe(
      queries.lookupCollection(event.data.collectionId),
      O.fromEither,
    ),
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

