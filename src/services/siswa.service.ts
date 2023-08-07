import { logger } from '../utils/logger'
import siswaModel from '../models/siswa.model'
import SiswaType from '../types/siswa.type'

export const getSiswaById = async (id: string) => {
  return await siswaModel.findOne({ siswa_id: id })
}

export const getSiswaFromDB = async () => {
  return await siswaModel
    .find()
    .then((data) => {
      return data
    })
    .catch((error) => {
      logger.info('Cannot get data from DB')
      logger.error(error)
    })
}

export const addSiswaToDB = async (payload: SiswaType) => {
  return await siswaModel.create(payload)
}

export const updateSiswaById = async (id: string, payload: SiswaType) => {
  const result = await siswaModel.findOneAndUpdate(
    {
      siswa_id: id
    },
    {
      $set: payload
    }
  )
  return result
}

export const deleteSiswaById = async (id: string) => {
  const result = await siswaModel.findOneAndDelete({
    siswa_id: id
  })

  return result
}
