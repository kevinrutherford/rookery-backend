import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { renderWork } from './render-work'
import { View } from '../../http/index.open'
import { Queries } from '../../readmodels'

export const getWorks = (queries: Queries): View => () => pipe(
  queries.allWorks(),
  RA.map(renderWork),
  (works) => ({
    data: works,
  }),
  TE.right,
)

