export type ErrorCode =
  | 'bad-input'
  | 'not-found'
  | 'not-authorised'
  | 'fatal-error'

export type ErrorOutcome = {
  errors: Array<{
    category: ErrorCode,
    message: string,
    evidence: Record<string, unknown>,
  }>,
}

