import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

export const findDiscussionsAboutWork = (currentState: Readmodel): Domain['findDiscussionsAboutWork'] => (workId) => pipe(
  Array.from(currentState.entriesByEntryId.values()),
  RA.filter((discussion) => discussion.workId === workId),
)

