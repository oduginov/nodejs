const router = require('express').Router();
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await taskService.getTasksByBoardId(req.params.boardId);
  await res.json(tasks);
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const task = await taskService.getTasksByBoardTaskIds(
    req.params.boardId,
    req.params.taskId
  );
  if (task) {
    await res.json(task);
  } else {
    res.status(404).json();
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  await res.json(await taskService.createTask(req.params.boardId, req.body));
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const task = await taskService.updateTask(
    req.params.boardId,
    req.params.taskId,
    req.body
  );
  if (task) {
    await res.json(task);
  } else {
    res.status(404).json();
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  if (await taskService.deleteTask(req.params.taskId)) {
    res.status(204).json();
  } else {
    res.status(404).json();
  }
});

router.route('/:id/t').get(async (req, res) => {
  const tasks = await taskService.getAll();
  await res.json(tasks);
});

module.exports = router;
