export type Collection = {
  id: string,
  name: string,
  description: string,
  papersCount: number,
  commentsCount: number,
  followersCount: number,
  lastActivityAt: Date,
}

export const allCollections = (currentState: ReadonlyArray<Collection>) => (): ReadonlyArray<Collection> => {
  return currentState
}

