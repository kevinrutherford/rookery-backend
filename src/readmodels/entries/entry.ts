export type Entry = {
  id: string,
  doi: string,
  collectionId: string,
  addedAt: Date,
  frontMatter?: {
    title: string,
  },
}

