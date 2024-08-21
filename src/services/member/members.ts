import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { renderMember } from '../json-api/render-member'
import { Service } from '../service'

export const getMembers = (queries: Domain): Service => () => pipe(
  queries.allMembers(),
  RA.map(renderMember),
  (members) => ({
    data: members,
  }),
  E.right,
)

