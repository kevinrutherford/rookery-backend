import { allCollections, Collection } from './all-collections'
import { Queries } from './queries'

export const instantiate = (): Queries => {
  const currentState: ReadonlyArray<Collection> = [
    {
      id: 'chs',
      name: 'CHS',
      description: 'Papers under review by the CHS project',
      papersCount: 12,
      commentsCount: 23,
      followersCount: 4,
      lastActivityAt: new Date(),
    },
    {
      id: 'pru3',
      name: 'PRU3',
      description: 'Papers to be referenced by the PRU3 project',
      papersCount: 134,
      commentsCount: 258,
      followersCount: 11,
      lastActivityAt: new Date(),
    },
  ]
  return ({
    allCollections: allCollections(currentState),
  })
}
