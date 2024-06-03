import { FrontMatter } from '../domain-event'

export type Work = {
  id: string,
  updatedAt: Date,
  frontMatter: FrontMatter,
}

