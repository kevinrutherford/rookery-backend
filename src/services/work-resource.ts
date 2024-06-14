type FrontMatterNotDetermined = {
  crossrefStatus: 'not-determined',
  reason: 'never-fetched' | 'response-invalid' | 'response-unavailable',
}

type FrontMatterNotFound = {
  crossrefStatus: 'not-found',
}

type FMF = {
  crossrefStatus: 'found',
  title: string,
  abstract: string,
  authors: ReadonlyArray<string>,
}

type FrontMatter = FMF | FrontMatterNotFound | FrontMatterNotDetermined

export type Work = {
  id: string,
  updatedAt: Date,
  frontMatter: FrontMatter,
}

