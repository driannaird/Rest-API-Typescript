import { Router } from 'express'
import { createSiswa, deleteSiswa, getSiswa, updateSiswa } from '../controllers/siswa.controller'

export const SiswaRouter: Router = Router()

SiswaRouter.get('/', getSiswa)
SiswaRouter.get('/:id', getSiswa)
SiswaRouter.post('/', createSiswa)
SiswaRouter.put('/:id', updateSiswa)
SiswaRouter.delete('/:id', deleteSiswa)
