const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res, next) => {
  const boards = await boardsService.getAll();
  res.json(boards);
  next();
});

router.route('/:id').get(async (req, res, next) => {
  const board = await boardsService.getBoardById(req.params.id);
  if (board) {
    res.json(board);
  } else {
    // res.status(404).json();
    const error = new Error();
    error.status = 404;
    return next(error);
  }
  next();
});

router.route('/').post(async (req, res, next) => {
  const board = await boardsService.createBoard(req.body);
  res.status(200).json(board);
  next();
});

router.route('/:id').put(async (req, res, next) => {
  const board = await boardsService.updateBoard(req.params.id, req.body);
  if (board) {
    res.status(200).json(board);
  } else {
    // res.status(401).json();
    const error = new Error();
    error.status = 401;
    throw error;
  }
  next();
});

router.route('/:id').delete(async (req, res, next) => {
  if (await boardsService.deleteBoard(req.params.id)) {
    res.status(204).json();
  } else {
    // res.status(404).json();
    const error = new Error();
    error.status = 404;
    throw error;
  }
  next();
});

module.exports = router;
