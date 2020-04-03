const Board = require('./board.model');
const boards = [
  { id: '0000-0000-0000-0000', title: 'default board', columns: [] }
];

const getAll = async () => {
  return boards;
};

const getBoardById = async id => {
  return boards.find(board => board.id === id);
};

const createBoard = async board => {
  const newBoard = new Board({
    title: board.title,
    columns: board.columns
  });
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, data) => {
  const board = await getBoardById(id);
  if (!board) {
    return null;
  }
  const index = boards.indexOf(board);
  boards[index].title = data.title ? data.title : boards[index].title;
  boards[index].columns = data.columns ? data.columns : boards[index].columns;
  return boards[index];
};

const deleteBoard = async id => {
  // TODO should delete tasks upon deletion
  const user = await getBoardById(id);
  if (!user) {
    return false;
  }
  const index = boards.indexOf(user);
  boards.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
