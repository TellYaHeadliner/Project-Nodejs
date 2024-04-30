const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
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
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    resave: false,
    saveUnitialized: false,
    secret: "333699"
}));

// Routes
app.use('/', General.routerGeneral);
app.use('/login',General.routerGeneral);
app.use('/logout',General.routerGeneral);
app.use('/signup',General.routerGeneral);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT} `);
});
