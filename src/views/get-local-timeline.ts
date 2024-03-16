import * as TE from 'fp-ts/TaskEither'
import { View } from '../http/index.open'
import { Queries } from '../readmodels'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getLocalTimeline = (queries: Queries): View => () => {
  return TE.right({
    type: 'Timeline',
    data: [
      {
        userHandle: 'mgoff',
        timestamp: new Date().toISOString(),
        action: 'commented on a paper in collection CHS',
        content: 'Totally',
      },
      {
        userHandle: 'khcheck',
        timestamp: new Date().toISOString(),
        action: 'commented on a paper in collection CHS',
        content: 'This is just awesome, dude!',
      },
      {
        userHandle: 'DonnaB',
        timestamp: new Date().toISOString(),
        action: 'added a paper to collection CHS',
        content: '10.1111/padm.12268',
      },
      {
        userHandle: 'DonnaB',
        timestamp: new Date().toISOString(),
        action: 'added a paper to collection CHS',
        content: '10.1126/science.1172133',
      },
      {
        userHandle: 'khcheck',
        timestamp: new Date().toISOString(),
        action: 'added a paper to collection CHS',
        content: '10.3399/BJGP.2023.0216',
      },
      {
        userHandle: 'mgoff',
        timestamp: new Date().toISOString(),
        action: 'created collection PRU3',
        content: 'Project PRU3 review inputs.',
      },
      {
        userHandle: 'DonnaB',
        timestamp: new Date().toISOString(),
        action: 'created collection CHS',
        content: 'Papers being considered for the bibliography of project CHS.',
      },
    ],
  })
}

