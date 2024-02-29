export type Collection = {
  id: string,
  name: string,
  description: string,
  papersCount: number,
  commentsCount: number,
  followersCount: number,
  lastActivityAt: Date,
}

export const allCollections = (currentState: Map<string, Collection>) => (): ReadonlyArray<Collection> => {
  return Array.from(currentState.values())
}

