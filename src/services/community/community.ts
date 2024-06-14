import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Domain } from '../domain'
import { renderCommunity } from '../json-api/render-community'
import { View } from '../view'

export const getCommunity = (queries: Domain): View => () => () => pipe(
  queries.getCommunity(),
  E.fromOption(() => ({
    category: 'not-found' as const,
    message: 'Community not initialised',
    evidence: {},
  })),
  E.map((community) => ({
    data: renderCommunity(community),
  })),
)

