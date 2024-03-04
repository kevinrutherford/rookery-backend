import { Entry } from './entry'

export type Readmodel = {
  byCollection: Map<string, Array<Entry>>,
  byEntryId: Map<string, Entry>,
}

