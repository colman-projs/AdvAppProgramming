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
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/commercials', commercial);
app.use('/admin', admin);

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
  var id = 1;
    io.sockets.emit('id', id);


  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function (data) {
    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.emit('updatechat', socket.username, data);
  });


  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username){
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    // echo to client they've connected
    socket.emit('updatechat', 'SERVER', 'you have connected');
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
    // update the list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  });
});

};

onStartup();
