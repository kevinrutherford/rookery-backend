import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { validateInput } from './validate-input'
import { View } from './view'

const paramsCodec = t.type({
  id: t.string,
})

export const getEntry = (): View => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.map((params) => params.id),
  E.map(() => ({
    type: 'Entry',
    data: {
      id: '72fe90a8-38db-4635-81db-1e78501fce22',
      title: 'A General Framework for Analyzing Sustainability of Social-Ecological Systems',
      doi: '10.1126/science.1172133',
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

