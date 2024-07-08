import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { Collection } from '../state/collection'
import { Readmodel } from '../state/readmodel'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const containsWork = (workId: string) => (collection: Collection): boolean => true

export const collectionsContainingWork = (currentState: Readmodel): Domain['collectionsContainingWork'] => (workId) => pipe(
  Array.from(currentState.collections.values()),
  RA.filter(containsWork(workId)),
)

