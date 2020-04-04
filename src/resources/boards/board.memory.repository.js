const Board = require('./board.model');
const uuid = require('uuid');
const taskService = require('../tasks/task.service');

const boards = [
  {
    id: 'board-0000-0000-0000-0000',
    title: 'default board',
    columns: [
      { id: 'column-0000-0000-0000-0000', title: 'default column', order: 1 }
    ]
  }
];

const getAll = async () => {
  return boards;
};

const getBoardById = async id => {
  return boards.find(board => board.id === id);
};

const createBoard = async board => {
  const newBoard = new Board(board);
  for (let i = 0; i < newBoard.columns.length; i++) {
    newBoard.columns[i].id = uuid();
  }
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, data) => {
  const index = boards.findIndex(board => board.id === id);
  if (index < 0) {
    return null;
  }
  boards[index].title = data.title ? data.title : boards[index].title;
  boards[index].columns = data.columns ? data.columns : boards[index].columns;
  return boards[index];
};

const deleteBoard = async id => {
  const index = boards.findIndex(board => board.id === id);
  if (index < 0) {
    return false;
  }
  await taskService.deleteTaskByBoardId(id);
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
