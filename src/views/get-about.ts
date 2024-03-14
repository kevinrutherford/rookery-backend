import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { View } from '../http/index.open'

export const getAbout = (): View => () => pipe(
  {
    type: 'About',
    data: {
      community: {
        name: 'Health organisation, policy and economics (HOPE)',
        affiliation: 'Centre for Primary Care and Health Services Research, Manchester University',
        overview: `
        This interdisciplinary theme focuses upon research which investigates the supply, organisation, management and financing of health and social care services.

Our expertise encompasses rigorous econometric analysis and a wide range of qualitative social scientific methods, including particular experience in the use of ethnographic approaches to understand organisational processes.`,
        admins: ['@DonnaB', '@kevin'],
      },
      backend: {
        version: 'unknown',
      },
    },
  },
  E.right,
)

