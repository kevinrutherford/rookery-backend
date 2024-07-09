import { FrontMatter } from '../domain-event'

export type Work = {
  id: string,
  doi: string,
  updatedAt: Date,
  frontMatter: FrontMatter,
}

