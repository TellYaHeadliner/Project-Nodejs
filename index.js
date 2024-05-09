const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const Admin  = require('./routes/routesAdmin');
const Client = require('./routes/routesClients')
const General = require('./routes/routesGeneral')
const cookieParser = require('cookie-parser');



// GỌI PORT
dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "333699"
}));
app.use(cookieParser())

// Routes
app.use('/', General.routerGeneral);
app.use('/', Admin.routerAdmin);
app.use('/',Client.routerClient);
app.use('/signup',General.routerGeneral);


app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT} `);
});
