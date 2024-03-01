type Entry = {
  id: string,
  doi: string,
  frontMatter: {
    title: string,
  },
  commentsCount: number,
  latestActivityAt: string,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const findEntries = (collectionId: string): ReadonlyArray<Entry> => [
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
]

