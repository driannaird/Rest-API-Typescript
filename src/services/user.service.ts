import UserType from '../types/user.type'
import userModel from '../models/user.model'

export const createUser = async (payload: UserType) => {
  return await userModel.create(payload)
}

export const findUserByEmail = async (email: string) => {
  return await userModel.findOne({ email })
}

export const findUserById = async (userid: string) => {
  return await userModel.findOne({ user_id: userid })
}
