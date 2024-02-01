import { listMissingCards } from './box/list-missing-cards'
import { View } from './view'
import { Readmodel } from '../readmodel'

export type Views = {
  listMissingCards: View,
}

export const instantiate = (readmodel: Readmodel): Views => ({
  listMissingCards: listMissingCards(readmodel.queries),
})
