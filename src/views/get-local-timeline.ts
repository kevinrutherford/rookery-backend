import * as TE from 'fp-ts/TaskEither'
import { View } from '../http/index.open'
import { Queries } from '../readmodels'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getLocalTimeline = (queries: Queries): View => () => {
  return TE.right({
    type: 'Timeline',
    data: queries.getLocalTimeline(),
  })
}

