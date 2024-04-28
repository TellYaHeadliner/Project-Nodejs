const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const Client = require('./controllers/controllerClient');
const Admin = require('./controllers/controllerAdmin');
const General = require('./controllers/controllerGeneral')
const connnectDB = require('./connectDB');

// GỌI PORT
dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', General.getMainByGeneral);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT} `);
})

