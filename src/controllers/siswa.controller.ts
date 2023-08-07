import { Request, Response } from 'express'
import { getSiswaById, getSiswaFromDB, addSiswaToDB, updateSiswaById, deleteSiswaById } from '../services/siswa.service'
import { logger } from '../utils/logger'
import { v4 as uuidv4 } from 'uuid'
import { createSiswaValidation, updateSiswaValidation } from '../validations/siswa.validation'

export const getSiswa = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  if (id) {
    const siswa = await getSiswaById(id)
    if (siswa) {
      logger.info('Success get siswa data')
      return res.status(200).send({ status: true, statusCode: 200, data: siswa })
    } else {
      logger.info('siswa not found')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found', data: {} })
    }
  } else {
    const siswas: any = await getSiswaFromDB()
    logger.info('Success get all siswa data')
    return res.status(200).send({ status: true, statusCode: 200, data: siswas })
  }
}

export const createSiswa = async (req: Request, res: Response) => {
  req.body.siswa_id = uuidv4()
  const { error, value } = createSiswaValidation(req.body)
  if (error) {
    logger.error(`If add new siswa, ${error.details[0].message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: [{}] })
  }

  try {
    await addSiswaToDB(value)
    logger.info('Success add new siswa')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Add siswa success' })
  } catch (error) {
    logger.error(`If add new siswa, ${error}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const updateSiswa = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = updateSiswaValidation(req.body)
  if (error) {
    logger.error(`If add new siswa, ${error.details[0].message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: [{}] })
  }

  try {
    const result = await updateSiswaById(id, value)

    if (result) {
      logger.info('Success update siswa')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Update siswa success' })
    } else {
      logger.info('Data not found')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error(error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const deleteSiswa = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const result = await deleteSiswaById(id)

    if (result) {
      logger.info('Success delete siswa')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete siswa success' })
    } else {
      logger.info('Data not found')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error(error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
