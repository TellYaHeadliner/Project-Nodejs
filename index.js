const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const Client = require('./routes/routesClients');
const Admin = require('./routes/routesAdmin');
const General = require('./routes/routesGeneral')
const connnectDB = require('./connectDB');

// GỌI PORT
dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', General.routerGeneral);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT} `);
})

