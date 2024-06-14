import { sequenceS } from 'fp-ts/Apply'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Activity } from '../activity-resource'
import { DoiEntered, Domain } from '../domain'
import { Work } from '../work-resource'

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

export const toDoiEnteredParagraph = (queries: Domain) => (event: DoiEntered): O.Option<Activity> => pipe(
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

