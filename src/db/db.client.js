const mongoose = require('mongoose');
const userService = require('../resources/users/user.service');

const connect = runServer => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection; // instance of connection
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', () => {
    // we are connected
    console.log('we are connected');
    runServer();

    userService.createUser({
      name: 'admin',
      login: 'admin',
      password: 'admin'
    });

    // db.dropDatabase();

    //   const users = [
    //     new User({ name: 'admin1', login: 'admin1', password: 'admin1' }),
    //     new User({
    //       name: 'user2',
    //       login: 'user-login',
    //       password: 'user-password'
    //     })
    //   ];
    //
    //   users.forEach(user => user.save());
    //
    //   const boards = [new Board({ title: 'default board', columns: [] })];
    //
    //   boards.forEach(board => board.save());
  });
};

module.exports = { connect };
