import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { renderDiscussion } from '../json-api/render-discussion'
import { Service } from '../service'

export const getDiscussions = (queries: Domain): Service => () => pipe(
  queries.allDiscussions(),
  RA.map(renderDiscussion),
  (discussions) => ({
    data: discussions,
  }),
  E.right,
)

