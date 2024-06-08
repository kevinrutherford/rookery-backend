import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { renderCommunity } from './render-community'
import { Queries } from '../../domain-model'
import { View } from '../view'

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
)

