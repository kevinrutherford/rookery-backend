import { renderWorkIdentifier } from './render-work-identifier'
import { Work } from '../../readmodels/works/work'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const renderWork = (work: Work) => ({
  ...renderWorkIdentifier(work.id),
  attributes: work.frontMatter,
})

