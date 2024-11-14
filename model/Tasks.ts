import { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  labels: {
    type: String,
    enum: ['Going On', 'Completed', 'Update Pending'],
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'inprogress'],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  tasks: {
    type: [String],
    default: [],
  },
  priority: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
    required: true,
  },
});

const Tasks = models.Tasks || model('Tasks', TaskSchema);

export default Tasks;
