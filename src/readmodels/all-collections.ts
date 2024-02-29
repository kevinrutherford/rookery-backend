type Collection = {
  id: string,
  name: string,
  description: string,
  papersCount: number,
  commentsCount: number,
  followersCount: number,
  lastActivityAt: Date,
}

export const allCollections = (): ReadonlyArray<Collection> => {
  return [
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
}

