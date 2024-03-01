import * as E from 'fp-ts/Either'
import { Collection } from './all-collections'
import { ErrorOutcome } from '../views'

export type CollectionWithEntries = {
  id: string,
  name: string,
  description: string,
  commentsCount: number,
  followersCount: number,
  entries: ReadonlyArray<{
    id: string,
    doi: string,
    frontMatter: {
      title: string,
    },
    commentsCount: number,
    latestActivityAt: string,
  }>,
}

type LookupCollection = (currentState: Map<string, Collection>)
=> (collectionId: string)
=> E.Either<ErrorOutcome, CollectionWithEntries>

export const lookupCollection: LookupCollection = (currentState) => (collectionId) => {
  if (!currentState.has(collectionId)) {
    return E.left({
      category: 'not-found',
      message: 'Collection not found',
      evidence: { collectionId },
    })
  }
  return E.right({
    id: 'chs',
    name: 'CHS',
    description: 'Papers under review by the CHS project',
    commentsCount: 23,
    followersCount: 4,
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
  })
}

