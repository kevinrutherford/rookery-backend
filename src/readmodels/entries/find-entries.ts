type Entry = {
  id: string,
  doi: string,
  frontMatter: {
    title: string,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const findEntries = (collectionId: string): ReadonlyArray<Entry> => [
]

