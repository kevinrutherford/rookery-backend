import * as E from 'fp-ts/Either'
import * as t from 'io-ts'
import { formatValidationErrors } from 'io-ts-reporters'
import * as tt from 'io-ts-types'
import { Readmodel } from '../state/readmodel'

const hardcodedActors = t.type({
  USER_A1_ID: tt.NonEmptyString,
  USER_A1_USERNAME: tt.NonEmptyString,
  USER_A1_DISPLAYNAME: tt.NonEmptyString,
  USER_A1_AVATAR_URL: tt.NonEmptyString,

  USER_A2_ID: tt.NonEmptyString,
  USER_A2_USERNAME: tt.NonEmptyString,
  USER_A2_DISPLAYNAME: tt.NonEmptyString,
  USER_A2_AVATAR_URL: tt.NonEmptyString,

  USER_A3_ID: tt.NonEmptyString,
  USER_A3_USERNAME: tt.NonEmptyString,
  USER_A3_DISPLAYNAME: tt.NonEmptyString,
  USER_A3_AVATAR_URL: tt.NonEmptyString,

  USER_B1_ID: tt.NonEmptyString,
  USER_B1_USERNAME: tt.NonEmptyString,
  USER_B1_DISPLAYNAME: tt.NonEmptyString,
  USER_B1_AVATAR_URL: tt.NonEmptyString,

  USER_B2_ID: tt.NonEmptyString,
  USER_B2_USERNAME: tt.NonEmptyString,
  USER_B2_DISPLAYNAME: tt.NonEmptyString,
  USER_B2_AVATAR_URL: tt.NonEmptyString,

  USER_B3_ID: tt.NonEmptyString,
  USER_B3_USERNAME: tt.NonEmptyString,
  USER_B3_DISPLAYNAME: tt.NonEmptyString,
  USER_B3_AVATAR_URL: tt.NonEmptyString,

  USER_CRB_ID: tt.NonEmptyString,
  USER_CRB_USERNAME: tt.NonEmptyString,
  USER_CRB_DISPLAYNAME: tt.NonEmptyString,
  USER_CRB_AVATAR_URL: tt.NonEmptyString,
})

export const cacheActor = (state: Readmodel, actorId: string): void => {
  if (state.members.get(actorId))
    return
  state.members.set(actorId, {
    id: actorId,
    username: 'unknown',
    displayName: 'Unknown User',
    avatarUrl: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png',
    followers: [],
    following: [],
    cache: 'fetching',
  })

  const env = hardcodedActors.decode(process.env)
  if (E.isLeft(env))
    throw new Error(formatValidationErrors(env.left).join('; '))

  const actorData = env.right

  state.members.set(actorData.USER_A1_ID, {
    id: actorData.USER_A1_ID,
    username: actorData.USER_A1_USERNAME,
    displayName: actorData.USER_A1_DISPLAYNAME,
    avatarUrl: actorData.USER_A1_AVATAR_URL,
    followers: [],
    following: [],
    cache: 'fetched',
  })
  state.members.set(actorData.USER_A2_ID, {
    id: actorData.USER_A2_ID,
    username: actorData.USER_A2_USERNAME,
    displayName: actorData.USER_A2_DISPLAYNAME,
    avatarUrl: actorData.USER_A2_AVATAR_URL,
    followers: [],
    following: [],
    cache: 'fetched',
  })
  state.members.set(actorData.USER_A3_ID, {
    id: actorData.USER_A3_ID,
    username: actorData.USER_A3_USERNAME,
    displayName: actorData.USER_A3_DISPLAYNAME,
    avatarUrl: actorData.USER_A3_AVATAR_URL,
    followers: [],
    following: [],
    cache: 'fetched',
  })

  state.members.set(actorData.USER_B1_ID, {
    id: actorData.USER_B1_ID,
    username: actorData.USER_B1_USERNAME,
    displayName: actorData.USER_B1_DISPLAYNAME,
    avatarUrl: actorData.USER_B1_AVATAR_URL,
    followers: [],
    following: [],
    cache: 'fetched',
  })
  state.members.set(actorData.USER_B2_ID, {
    id: actorData.USER_B2_ID,
    username: actorData.USER_B2_USERNAME,
    displayName: actorData.USER_B2_DISPLAYNAME,
    avatarUrl: actorData.USER_B2_AVATAR_URL,
    followers: [],
    following: [],
    cache: 'fetched',
  })
  state.members.set(actorData.USER_B3_ID, {
    id: actorData.USER_B3_ID,
    username: actorData.USER_B3_USERNAME,
    displayName: actorData.USER_B3_DISPLAYNAME,
    avatarUrl: actorData.USER_B3_AVATAR_URL,
    followers: [],
    following: [],
    cache: 'fetched',
  })

  state.members.set(actorData.USER_CRB_ID, {
    id: actorData.USER_CRB_ID,
    username: actorData.USER_CRB_USERNAME,
    displayName: actorData.USER_CRB_DISPLAYNAME,
    avatarUrl: actorData.USER_CRB_AVATAR_URL,
    followers: [],
    following: [],
    cache: 'fetched',
  })
}

