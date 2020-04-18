const uuid = require('uuid');
const mongoose = require('mongoose');

// class Board {
//   constructor({ title = 'default title', columns = [] }) {
//     this.id = uuid();
//     this.title = title;
//     this.columns = columns;
//   }
// }

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: Array,
    _id: { type: String, default: uuid }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = user => {
  const { title, columns } = user;
  return { id: user._id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
