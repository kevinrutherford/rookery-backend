import { renderParagraphIdentifier } from './render-paragraph-identifier'
import { TimelineParagraph } from './timeline-paragraph'
import { JsonApiResource } from '../json-api-resource'

export const renderParagraphResource = (para: TimelineParagraph): JsonApiResource => ({
  ...renderParagraphIdentifier(`local-${para.timestamp}`),
  attributes: {
    ...para,
    timestamp: para.timestamp.toISOString(),
  },
})

