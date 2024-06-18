export type ErrorCode =
  | 'bad-input'
  | 'not-found'
  | 'not-authorised'
  | 'fatal-error'

export type ErrorOutcome = {
  errors: Array<{
    code: ErrorCode,
    title: string,
    meta: Record<string, unknown>,
  }>,
}

