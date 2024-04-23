import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { View } from '../../http/index.open'
import { Queries } from '../../readmodels'
import { pathToCommunity } from '../community/path-to-community'
import { renderCommunityIdentifier } from '../community/render-community-identifier'

export const getRoot = (queries: Queries): View => () => pipe(
  {
    data: {
      type: 'root',
      id: '0',
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

