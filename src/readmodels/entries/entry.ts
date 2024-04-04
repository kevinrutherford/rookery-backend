export type Entry = {
  id: string,
  workId: string,
  collectionId: string,
  addedAt: Date,
  commentsCount: number,
  frontMatter?: {
    title: string,
  },
}

