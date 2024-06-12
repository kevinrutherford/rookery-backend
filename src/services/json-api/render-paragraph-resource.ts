import { JsonApiResource } from './json-api-resource'
import { renderParagraphIdentifier } from './render-paragraph-identifier'
import { TimelineParagraph } from '../timeline/timeline-paragraph'

export const renderParagraphResource = (para: TimelineParagraph): JsonApiResource => ({
  ...renderParagraphIdentifier(`local-${para.timestamp}`),
  attributes: {
    ...para,
    timestamp: para.timestamp.toISOString(),
  },
})

