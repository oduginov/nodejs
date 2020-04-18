const mongoose = require('mongoose');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

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

    // db.dropDatabase();

    const users = [
      new User({ name: 'Oleg', login: 'ol', password: 'psw' }),
      new User({
        name: 'user2',
        login: 'user-login',
        password: 'user-password'
      })
    ];

    users.forEach(user => user.save());

    const boards = [new Board({ title: 'default board', columns: [] })];

    boards.forEach(board => board.save());
  });
};

module.exports = { connect };
