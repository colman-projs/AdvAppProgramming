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
};

onStartup();
