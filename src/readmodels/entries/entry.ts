export type Entry = {
  id: string,
  workId: string,
  collectionId: string,
  addedAt: Date,
  frontMatter?: {
    title: string,
  },
}

