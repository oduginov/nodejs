const User = require('./user.model');
const users = [];

const getAll = async () => {
  return users;
};

const getUser = async index => {
  return users[index - 1];
};

const getLastUser = async () => {
  return users[users.length - 1];
};

const getUserById = async id => {
  return users.find(user => user.id === id);
};

const createUser = async user => {
  const newUser = new User({
    id: null,
    name: user.name,
    login: user.login,
    password: user.password
  });
  users.push(newUser);
  return newUser;
};

const updateUser = async (id, data) => {
  const user = await getUserById(id);
  if (!user) {
    return null;
  }
  const index = users.indexOf(user);
  users[index].name = data.name ? data.name : users[index].name;
  users[index].login = data.login ? data.login : users[index].login;
  users[index].password = data.password ? data.password : users[index].password;
  return users[index];
};

const deleteUser = async id => {
  // TODO should unassign user's tasks upon deletion
  const user = await getUserById(id);
  if (!user) {
    return false;
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  createUser,
  getUser,
  getLastUser,
  getUserById,
  updateUser,
  deleteUser
};
