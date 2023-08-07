import Joi from 'joi'
import TaskType from '../types/task.type'

export const createTaskValidation = (payload: TaskType) => {
  const schema = Joi.object({
    task_id: Joi.string().required(),
    task_name: Joi.string().required(),
    status: Joi.boolean().allow('', false)
  })

  return schema.validate(payload)
}
