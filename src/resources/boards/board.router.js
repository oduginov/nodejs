const router = require('express').Router();
const boardsService = require('./board.service');
const { catchErrors } = require('../../common/error-handling');
const Board = require('./board.model');

router.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    console.log(req.params);
    const board = await boardsService.getBoardById(req.params.id);
    console.log('board by id: ', board);
    if (board) {
      res.json(Board.toResponse(board));
    } else {
      // res.status(404).json();
      const error = new Error();
      error.status = 404;
      throw error;
    }
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardsService.createBoard(req.body);
    res.status(200).json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const board = await boardsService.updateBoard(req.params.id, req.body);
    if (board) {
      res.status(200).json(Board.toResponse(board));
    } else {
      // res.status(401).json();
      const error = new Error();
      error.status = 401;
      throw error;
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    if (await boardsService.deleteBoard(req.params.id)) {
      res.status(204).json();
    } else {
      // res.status(404).json();
      const error = new Error();
      error.status = 404;
      throw error;
    }
  })
);

module.exports = router;
