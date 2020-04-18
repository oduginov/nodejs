const usersRepo = require('./user.db.repository');
const { deleteUserFromTasks } = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const createUser = user => usersRepo.createUser(user);
const getLastUser = () => usersRepo.getLastUser();
const getUserById = id => usersRepo.getUserById(id);
const updateUser = (id, data) => {
  return usersRepo.updateUser(id, data);
};
const deleteUser = async id => {
  await deleteUserFromTasks(id);
  return usersRepo.deleteUser(id);
};

module.exports = {
  getAll,
  createUser,
  getLastUser,
  getUserById,
  updateUser,
  deleteUser
};
