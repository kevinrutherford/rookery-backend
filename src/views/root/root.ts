import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { Queries } from '../../domain-model'
import { pathToCommunity } from '../community/path-to-community'
import { renderCommunityIdentifier } from '../community/render-community-identifier'
import { View } from '../view'

export const getRoot = (queries: Queries): View => () => () => pipe(
  {
    data: {
      type: 'root',
      id: '0',
      attributes: {},
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
    },
  },
  TE.right,
)

