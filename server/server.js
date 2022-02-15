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
const io = require('socket.io').listen(server);

//Set the port
const port = 3000;

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/commercials', commercial);
app.use('/admins', admin);

const onStartup = async () => {
    connectDB(URI);

    app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`),
    );

// usernames which are currently connected to the chat
var usernames = {};

io.sockets.on('connection', function (socket) {

  /**
  When connecting, we want to write the client to the DB
    We need to generate an ID for the client?
      - to send it back? 
      yes , when client connected to server - we check in the DB for all users
      and then generate a userid and send it back to the client
  */
  var id = 1; // TODO: set users
    io.sockets.emit('id', id);

  // TODO: save users in DB

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
    
    // TODO: Remove user
    
  });
});

};

onStartup();
