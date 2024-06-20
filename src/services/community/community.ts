import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { renderCommunity } from '../json-api/render-community'
import { renderError } from '../json-api/render-error'
import { Service } from '../service'

export const getCommunity = (queries: Domain): Service => () => () => pipe(
  queries.getCommunity(),
  E.fromOption(() => renderError('not-found', 'Community not initialised', {})),
  E.map((community) => ({
    data: renderCommunity(community),
  })),
)

