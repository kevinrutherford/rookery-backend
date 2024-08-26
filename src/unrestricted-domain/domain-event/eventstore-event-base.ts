import * as t from 'io-ts'
import * as tt from 'io-ts-types'

export const esEventBase = t.type({
  id: tt.NonEmptyString,
  created: tt.date,
})

