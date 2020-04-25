const router = require('express').Router();
const taskService = require('./task.service');
const { catchErrors } = require('../../common/error-handling');
const Task = require('./task.model');

router.route('/:boardId/tasks').get(
  catchErrors(async (req, res) => {
    console.log('req.params.boardId:', req.params.boardId);
    const tasks = await taskService.getTasksByBoardId(req.params.boardId);
    await res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:boardId/tasks/:taskId').get(
  catchErrors(async (req, res) => {
    const task = await taskService.getTasksByBoardTaskIds(
      req.params.boardId,
      req.params.taskId
    );
    if (task) {
      await res.json(Task.toResponse(task));
    } else {
      // res.status(404).json();
      const error = new Error();
      error.status = 404;
      throw error;
    }
  })
);

router.route('/:boardId/tasks').post(
  catchErrors(async (req, res) => {
    const task = await taskService.createTask(req.params.boardId, req.body);
    res.json(Task.toResponse(task));
  })
);

router.route('/:boardId/tasks/:taskId').put(
  catchErrors(async (req, res) => {
    const task = await taskService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    if (task) {
      await res.json(Task.toResponse(task));
    } else {
      // res.status(404).json();
      const error = new Error();
      error.status = 404;
      throw error;
    }
  })
);

router.route('/:boardId/tasks/:taskId').delete(
  catchErrors(async (req, res) => {
    if (await taskService.deleteTask(req.params.taskId)) {
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
