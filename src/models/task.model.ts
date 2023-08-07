import mongoose, { Schema } from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    task_id: {
      type: String,
      unique: true
    },
    task_name: {
      type: String
    },
    status: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  { timestamps: true }
)

const taskModel = mongoose.model('task', taskSchema)

export default taskModel
