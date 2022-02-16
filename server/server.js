const express = require('express');
const bodyParser = require('body-parser');
const commercial = require('./routes/commercial');
const admin = require('./routes/admin');
const connectDB = require('./db/connect');
const cors = require('./middleware/cors');


//Set the DATABASE URI
const URI =
  'mongodb+srv://MafTech:Aa123456@advprog.uynif.mongodb.net/AdvPRog?retryWrites=true&w=majority';

//Set the express
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});

//Set the port
const port = 3000;

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/commercials', commercial);
app.use('/admins', admin);

const onStartup = async () => {
  connectDB(URI);

  server.listen(port, () =>
    console.log(`Server is listening on port ${port}...`),
  );

  io.on('connect', function (socket) {

    var id = 1; // TODO: set users
    socket.emit('id', id);

    // TODO: save users in DB
    socket.on('screen', function (screen) {
      console.log(`screen: ${screen}`);
    });


    // when the user disconnects.. perform this
    socket.on('disconnect', function () {

      // TODO: Remove user

    });
  });

};

onStartup();