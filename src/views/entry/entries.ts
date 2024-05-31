import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { renderEntry } from './render-entry'
import { Queries } from '../../domain-model'
import { View } from '../../http/index.open'

export const getEntries = (queries: Queries): View => () => () => pipe(
  queries.allEntries(),
  RA.map(renderEntry),
  (entries) => ({
    data: entries,
  }),
  TE.right,
)

