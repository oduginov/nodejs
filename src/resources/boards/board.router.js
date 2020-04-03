const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  // map user fields to exclude secret fields like "password"
  await res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getBoardById(req.params.id);
  if (board) {
    res.json(board);
  } else {
    res.status(404).json();
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.createBoard(req.body);
  res.status(200).json(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.updateBoard(req.params.id, req.body);
  if (board) {
    res.status(200).json(board);
  } else {
    res.status(401).json();
  }
});

router.route('/:id').delete(async (req, res) => {
  if (await boardsService.deleteBoard(req.params.id)) {
    res.status(204).json();
  } else {
    res.status(404).json();
  }
});

module.exports = router;
