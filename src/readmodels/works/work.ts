type FrontMatterNotDetermined = {
  crossrefStatus: 'not-determined',
  reason: 'never-fetched' | 'response-invalid' | 'response-unavailable',
}

type FrontMatterNotFound = {
  crossrefStatus: 'not-found',
}

type FrontMatterFound = {
  crossrefStatus: 'found',
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

