import { Request, Response } from 'express'
import { getTaskFromDB, addTaskToDB } from '../services/task.service'
import { logger } from '../utils/logger'
import { v4 as uuidv4 } from 'uuid'
import { createTaskValidation } from '../validations/task.validation'
import { findUserById } from '../services/user.service'

export const getTask = async (req: Request, res: Response) => {
  const tasks: any = await getTaskFromDB()
  logger.info('Success get all task data')
  return res.status(200).send({ status: true, statusCode: 200, data: tasks })
}

export const createTask = async (req: Request, res: Response) => {
  req.body.task_id = uuidv4()
  const { error, value } = createTaskValidation(req.body)

  if (error) {
    logger.error(`If add new task, ${error.details[0].message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: [{}] })
  }

  try {
    const user_id = res.locals.user._doc.user_id
    const user = await findUserById(user_id)
    if (!user) {
      logger.error('User not found')
      return res.status(422).send({ status: false, statusCode: 422, message: 'User not found' })
    }

    await addTaskToDB(value, user)
    logger.info('Success add new task')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Add task success' })
  } catch (error) {
    logger.error(`If add new task, ${error}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
