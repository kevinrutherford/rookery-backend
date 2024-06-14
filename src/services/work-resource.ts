import { FrontMatterFound } from '../unrestricted-domain/domain-event'

type FrontMatterNotDetermined = {
  crossrefStatus: 'not-determined',
  reason: 'never-fetched' | 'response-invalid' | 'response-unavailable',
}

type FrontMatterNotFound = {
  crossrefStatus: 'not-found',
}

/*
type FrontMatterFound = {
  crossrefStatus: 'found',
  title: string,
  abstract: string,
  authors: ReadonlyArray<string>,
}
*/

type FrontMatter = FrontMatterFound | FrontMatterNotFound | FrontMatterNotDetermined

export type Work = {
  id: string,
  updatedAt: Date,
  frontMatter: FrontMatter,
}

