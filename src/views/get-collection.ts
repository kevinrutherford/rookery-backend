import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { validateInput } from './validate-input'
import { View } from './view'

const paramsCodec = t.type({
  id: t.string,
})

export const getCollection = (): View => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.map((params) => params.id),
  E.map(() => ({
    type: 'Collection',
    data: {
      id: 'chs',
      name: 'CHS',
      description: 'Papers under review by the CHS project',
      commentsCount: 23,
      followersCount: 4,
      members: [
        {
          id: '10.1126%2Fscience.1172133',
          title: 'A General Framework for Analyzing Sustainability of Social-Ecological Systems',
          doi: '10.1126/science.1172133',
          commentsCount: 7,
          latestActivityAt: 'yesterday',
        },
        {
          id: '10.3399%2FBJGP.2023.0216',
          title: 'Implementing the Additional Roles Reimbursement Scheme in 7 English PCNs: a qualitative study',
          doi: '10.3399/BJGP.2023.0216',
          commentsCount: 19,
          latestActivityAt: '4 hours ago',
        },
        {
          id: '10.1111%2Fpadm.12268',
          title: 'INTERROGATING INSTITUTIONAL CHANGE: ACTORS\' ATTITUDES TO COMPETITION AND COOPERATION IN COMMISSIONING HEALTH SERVICES IN ENGLAND',
          doi: '10.1111/padm.12268',
          commentsCount: 19,
          latestActivityAt: '2 days ago',
        },
      ],
    },
  })),
)

