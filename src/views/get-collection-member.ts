import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { validateInput } from './validate-input'
import { View } from './view'

const paramsCodec = t.type({
  id: t.string,
  memberid: t.string,
})

export const getCollectionMember = (): View => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.map((params) => params.id),
  E.map(() => ({
    type: 'CollectionMember',
    data: {
      id: '10.1126%2Fscience.1172133',
      title: 'A General Framework for Analyzing Sustainability of Social-Ecological Systems',
      doi: '10.1126/science.1172133',
      comments: [
        {
          author: '@DonnaB',
          content: 'This looks great',
          timestamp: '2024-02-18T19:08:55',
          replies: [
            {
              author: '@khcheck',
              content: 'I agree',
              timestamp: '2024-02-18T19:08:55',
              replies: [],
            },
          ],
        },
        {
          author: '@mgoff',
          content: 'Good for me',
          timestamp: '2024-02-18T19:08:55',
          replies: [],
        },
      ],
    },
  })),
)

