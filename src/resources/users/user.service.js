const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const createUser = user => usersRepo.createUser(user);
const getUser = index => usersRepo.getUser(index);
const getLastUser = () => usersRepo.getLastUser();
const getUserById = id => usersRepo.getUserById(id);
const updateUser = (id, data) => {
  return usersRepo.updateUser(id, data);
};
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = {
  getAll,
  createUser,
  getUser,
  getLastUser,
  getUserById,
  updateUser,
  deleteUser
};
