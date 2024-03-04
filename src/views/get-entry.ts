import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { validateInput } from './validate-input'
import { View } from './view'
import { Queries } from '../readmodels'

const paramsCodec = t.type({
  id: t.string,
})

export const getEntry = (queries: Queries): View => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.map((params) => params.id),
  E.flatMapOption(queries.lookupEntry, (id) => ({
    category: 'not-found' as const,
    message: 'Entry not found',
    evidence: { id },
  })),
  E.map((entry) => ({
    type: 'Entry',
    data: {
      ...entry,
      comments: [
        {
          id: 'ea36343f-97b2-4908-86a5-1f5a4f623297',
          author: '@DonnaB',
          content: 'This looks great',
          timestamp: '2024-02-18T19:08:55',
          replies: [
            {
              id: 'e31a2757-0d7c-4e51-965b-28b079a1fd7a',
              author: '@khcheck',
              content: 'I agree',
              timestamp: '2024-02-18T19:08:55',
              replies: [],
            },
          ],
        },
        {
          id: '89a82f65-4752-4db0-a271-effe3336dd68',
          author: '@mgoff',
          content: 'Good for me',
          timestamp: '2024-02-18T19:08:55',
          replies: [],
        },
      ],
    },
  })),
)

