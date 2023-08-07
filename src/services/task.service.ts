import { logger } from '../utils/logger'
import taskModel from '../models/task.model'
import TaskType from '../types/task.type'
export const getTaskFromDB = async () => {
  return await taskModel
    .find()
    .select('-_id -__v')
    .populate('user', 'user_id email name role')
    .then((data) => {
      return data
    })
    .catch((error) => {
      logger.info('Cannot get data from DB')
      logger.error(error)
    })
}

export const addTaskToDB = async (TaskPayload: TaskType, UserPayload: any) => {
  return await taskModel.create({
    task_id: TaskPayload.task_id,
    task_name: TaskPayload.task_name,
    status: TaskPayload.status,
    user: UserPayload
  })
}
