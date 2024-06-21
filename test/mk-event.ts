import { arbitraryDate, arbitraryWord } from './helpers'

export const mkEvent = (type: string, data: Record<string, unknown>): unknown => ({
  created: arbitraryDate(),
  id: arbitraryWord(),
  type,
  data,
})

