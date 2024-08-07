import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { renderAsFeed } from './render-as-feed'
import { Domain } from '../../domain/index.open'
import { Service } from '../service'

export const getLocalTimeline = (queries: Domain): Service => () => pipe(
  queries.getLocalTimeline(),
  renderAsFeed(queries),
  E.right,
)

