import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { renderCommunity } from './render-community'
import { View } from '../../http/index.open'
import { Queries } from '../../readmodels'

export const getCommunity = (queries: Queries): View => () => () => pipe(
  queries.getCommunity(),
  E.fromOption(() => ({
    category: 'not-found' as const,
    message: 'Community not initialised',
    evidence: {},
  })),
  E.map((community) => ({
    data: renderCommunity(community),
  })),
  TE.fromEither,
)

