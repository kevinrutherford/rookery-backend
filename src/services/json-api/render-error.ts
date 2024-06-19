import {
  ErrorCode, ErrorDocument, JsonApiErrorsDocument,
} from './json-api-resource'

export const renderError = (code: ErrorCode, title: string, meta: ErrorDocument['meta']): JsonApiErrorsDocument => ({
  errors: [{
    code,
    title,
    meta,
  }],
})

