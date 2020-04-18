const uuid = require('uuid');
const mongoose = require('mongoose');

// class Task {
//   constructor({ title, order, description, userId, boardId, columnId }) {
//     this.id = uuid();
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }
// }

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: { type: String, default: uuid }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { title, order, description, userId, boardId, columnId } = task;
  return { id: task._id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
