const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const commercial = require('./routes/commercial')
const connectDB = require('./db/connect');
const cors = require('./middleware/cors')

//Set the DATABASE URI
const URI = "mongodb+srv://MafTech:Aa123456@advprog.uynif.mongodb.net/AdvPRog?retryWrites=true&w=majority"
//Set the express
const app = express();

//Set the port
const port = 3000;

//app.use(cors);
app.use(cors);

app.use(bodyParser.urlencoded({extended : true}));
app.use('/commercials', commercial);

const start = async () => {
    try {
      await connectDB(URI);
      console.log("Connected to ATLAS")
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };

  start();


