import Joi from 'joi'
import SiswaType from '../types/siswa.type'

export const createSiswaValidation = (payload: SiswaType) => {
  const schema = Joi.object({
    siswa_id: Joi.string().required(),
    nama: Joi.string().required(),
    NIS: Joi.string().required(),
    NISN: Joi.string().required(),
    TTK: Joi.string().required(),
    JK: Joi.string().required(),
    nama_ayah: Joi.string().required(),
    nama_ibu: Joi.string().required(),
    alamat: Joi.string().required()
  })

  return schema.validate(payload)
}

export const updateSiswaValidation = (payload: SiswaType) => {
  const schema = Joi.object({
    nama: Joi.string().allow('', null),
    NIS: Joi.string().allow('', null),
    NISN: Joi.string().allow('', null),
    TTK: Joi.string().allow('', null),
    JK: Joi.string().allow('', null),
    nama_ayah: Joi.string().allow('', null),
    nama_ibu: Joi.string().allow('', null),
    alamat: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}
