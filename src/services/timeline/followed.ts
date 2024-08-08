import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { renderAsFeed } from './render-as-feed'
import { Domain } from '../../domain/domain'
import { Service } from '../service'

export const getFollowedTimeline = (queries: Domain): Service => () => pipe(
  queries.getFollowedTimeline(),
  renderAsFeed(queries),
  E.right,
)

