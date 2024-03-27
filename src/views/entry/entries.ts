import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { View } from '../../http/index.open'
import { Queries } from '../../readmodels'

export const getEntries = (queries: Queries): View => () => pipe(
  queries.allEntries(),
  (entries) => ({
    type: 'Entries',
    data: pipe(
      entries,
      RA.map((entry) => ({
        type: 'entry',
        id: entry.id,
        attributes: {
          addedAt: entry.addedAt.toISOString(),
        },
      })),
    ),
  }),
  TE.right,
)

