import { Readmodel } from './readmodel'
import { Work } from './work'

type LookupWork = (currentState: Readmodel) => (id: string) => Work

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const lookupWork: LookupWork = (currentState) => (id) => ({
  id,
  crossrefStatus: 'not-determined',
})

