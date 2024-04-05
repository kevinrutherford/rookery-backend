type FrontMatterNotDetermined = {
  crossrefStatus: 'not-determined',
}

type FrontMatterNotFound = {
  crossrefStatus: 'not-found',
}

type FrontMatterFound = {
  crossrefStatus: 'not-found',
  title: string,
  abstract: string,
  authors: ReadonlyArray<string>,
}

type FrontMatter =
  | FrontMatterNotDetermined
  | FrontMatterNotFound
  | FrontMatterFound

export type Work = {
  id: string,
  frontMatter: FrontMatter,
}

