const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res, next) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
  next();
});

router.route('/:id').get(async (req, res, next) => {
  const user = await usersService.getUserById(req.params.id);
  if (user) {
    res.status(200).json(User.toResponse(user));
  } else {
    // res.status(404).json();
    const error = new Error();
    error.status(404);
    throw error;
  }
  next();
});

router.route('/').post(async (req, res, next) => {
  const user = await usersService.createUser(req.body);
  res.status(200).json(User.toResponse(user));
  next();
});

router.route('/:id').put(async (req, res, next) => {
  const user = await usersService.updateUser(req.params.id, req.body);
  if (user) {
    await res.status(200).json(User.toResponse(user));
  } else {
    // res.status(401).json();
    const error = new Error();
    error.status = 401;
    throw error;
  }
  next();
});

router.route('/:id').delete(async (req, res, next) => {
  if (await usersService.deleteUser(req.params.id)) {
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
