import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { validateInput } from './validate-input'
import { View } from './view'
import { Queries } from '../readmodels'

const paramsCodec = t.type({
  id: t.string,
})

export const getCollection = (queries: Queries): View => (input) => pipe(
  input,
  validateInput(paramsCodec),
  E.map((params) => params.id),
  E.flatMapOption(queries.lookupCollection, (id) => ({
    category: 'not-found' as const,
    message: 'Collection not found',
    evidence: { id },
  })),
  E.map((collection) => ({
    type: 'Collection',
    data: {
      type: 'Collection',
      ...collection,
      lastActivityAt: collection.lastActivityAt.toISOString(), // SMELL: duplication?
      entries: [
        {
          id: '72fe90a8-38db-4635-81db-1e78501fce22',
          doi: '10.1126/science.1172133',
          frontMatter: {
            title: 'A General Framework for Analyzing Sustainability of Social-Ecological Systems',
          },
          commentsCount: 7,
          latestActivityAt: new Date().toISOString(),
        },
        {
          id: '97ab7e35-5baa-4ddd-bd2f-eb41d1edf9b8',
          doi: '10.3399/BJGP.2023.0216',
          frontMatter: {
            title: 'Implementing the Additional Roles Reimbursement Scheme in 7 English PCNs: a qualitative study',
          },
          commentsCount: 19,
          latestActivityAt: new Date().toISOString(),
        },
        {
          id: '036b2df7-a67c-4a40-9bad-0438978f8e07',
          doi: '10.1111/padm.12268',
          frontMatter: {
            title: 'INTERROGATING INSTITUTIONAL CHANGE: ACTORS\' ATTITUDES TO COMPETITION AND COOPERATION IN COMMISSIONING HEALTH SERVICES IN ENGLAND',
          },
          commentsCount: 19,
          latestActivityAt: new Date().toISOString(),
        },
      ],
    },
  })),
)

