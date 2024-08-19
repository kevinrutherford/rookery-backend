import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { Collection } from '../state/collection'
import { Readmodel } from '../state/readmodel'

const containsWork = (workId: string, currentState: Readmodel) => (collection: Collection): boolean => pipe(
  currentState.discussionsByCollection.get(collection.id) ?? [],
  RA.filter((entry) => entry.workId === workId),
  RA.isNonEmpty,
)

export const collectionsContainingWork = (currentState: Readmodel): Domain['collectionsContainingWork'] => (workId) => pipe(
  Array.from(currentState.collections.values()),
  RA.filter(containsWork(workId, currentState)),
)

