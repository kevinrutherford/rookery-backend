import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { View } from '../http/index.open'

export const getLocalTimeline = (): View => () => pipe(
  {
    type: 'Timeline',
    data: [
      {
        userHandle: 'mgoff',
        timestamp: '1h',
        action: 'commented on a paper in collection CHS',
        content: 'Totally',
      },
      {
        userHandle: 'khcheck',
        timestamp: '1h',
        action: 'commented on a paper in collection CHS',
        content: 'This is just awesome, dude!',
      },
      {
        userHandle: 'DonnaB',
        timestamp: '3h',
        action: 'added a paper to collection CHS',
        content: '10.1111/padm.12268',
      },
      {
        userHandle: 'DonnaB',
        timestamp: '3h',
        action: 'added a paper to collection CHS',
        content: '10.1126/science.1172133',
      },
      {
        userHandle: 'khcheck',
        timestamp: '4h',
        action: 'added a paper to collection CHS',
        content: '10.3399/BJGP.2023.0216',
      },
      {
        userHandle: 'mgoff',
        timestamp: '1d',
        action: 'created collection PRU3',
        content: 'Project PRU3 review inputs.',
      },
      {
        userHandle: 'DonnaB',
        timestamp: '2d',
        action: 'created collection CHS',
        content: 'Papers being considered for the bibliography of project CHS.',
      },
    ],
  },
  E.right,
)

