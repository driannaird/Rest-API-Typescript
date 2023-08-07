import { Router } from 'express'
import { getTask, createTask } from '../controllers/task.controller'
import { requireAdmin } from '../middleware/auth'

export const TaskRouter: Router = Router()

TaskRouter.get('/', getTask)
TaskRouter.post('/', requireAdmin, createTask)
