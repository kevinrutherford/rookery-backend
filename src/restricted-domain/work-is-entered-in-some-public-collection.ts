import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Domain } from '../domain/index.open'

export const workIsEnteredInSomePublicCollection = (queries: Domain) => (workId: string): boolean => pipe(
  workId,
  queries.collectionsContainingWork,
  RA.filter((collection) => !collection.isPrivate),
  RA.isNonEmpty,
)

