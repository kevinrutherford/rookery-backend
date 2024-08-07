import { Update } from '../../domain/index.open'
import { Readmodel } from '../state/readmodel'

type GFT = (currentState: Readmodel) => () => ReadonlyArray<Update>

export const getFollowedTimeline: GFT = () => () => []

