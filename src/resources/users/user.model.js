const uuid = require('uuid');
const mongoose = require('mongoose');

// class User {
//   static toResponse(user) {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }
//
//   constructor({
//                 id = uuid(),
//                 name = 'USER',
//                 login = 'user',
//                 password = 'P@55w0rd'
//               } = {}) {
//     this.id = id || uuid();
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }
// }

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: { type: String, default: uuid }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
