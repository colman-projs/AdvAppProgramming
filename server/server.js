const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const commercial = require('./routes/commercial')
const connectDB = require('./db/connect');
const cors = require('cors')

//Set the express
const app = express();

//Set the port
const port = 3000;

// Add headers before the routes are defined
//app.use(cors);
app.use(bodyParser.urlencoded({extended : true}));
app.use('/commercials', commercial);

const start = async () => {
    try {
      await connectDB("mongodb://localhost:27017/AdvProg");
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };

  start();


