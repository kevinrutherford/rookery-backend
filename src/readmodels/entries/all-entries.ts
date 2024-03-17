import { pipe } from 'fp-ts/function'
import { Entry } from './entry'
import { Readmodel } from './readmodel'

export const allEntries = (currentState: Readmodel) => (): ReadonlyArray<Entry> => pipe(
  currentState.byEntryId,
  (entries) => Array.from(entries.values()),
)

