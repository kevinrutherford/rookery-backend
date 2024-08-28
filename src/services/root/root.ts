import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import { Domain } from '../../domain/index.open'
import { renderCommunityIdentifier } from '../json-api/render-community-identifier'
import { Service } from '../service'
import { pathToCommunity } from '../ui-links'

export const getRoot = (queries: Domain): Service => () => pipe(
  {
    data: {
      type: 'root',
      id: '0',
      attributes: {
        version: '$Version$',
      },
      relationships: {
        community: {
          data: pipe(
            queries.getCommunity(),
            O.match(
              () => null,
              (c) => renderCommunityIdentifier(c.id),
            ),
          ),
          links: { related: pathToCommunity() },
        },
      },
      meta: pipe(
        queries.info(),
        (probe) => ({
          eventsCount: probe.eventsCount,
          unexpectedEvents: pipe(
            probe.unexpectedEvents, // SMELL -- unnecessary eventstore details
            RA.map((event) => JSON.stringify(event, (_, v) => (typeof v === 'bigint' ? v.toString() : v))),
          ),
          unrecognisedEvents: pipe(
            probe.unrecognisedEvents, // SMELL -- unnecessary eventstore details
            RA.map((event) => JSON.stringify(event, (_, v) => (typeof v === 'bigint' ? v.toString() : v))),
          ),
        }),
      ),
    },
  },
  E.right,
)

