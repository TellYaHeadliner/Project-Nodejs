const express = require('express');
const path = require('path');
const {getBlog} = require('../middleware/getBlog')
const getFooter = require('../middleware/getFooter')
const getHeader = require('../middleware/getHeader');
const { he } = require('date-fns/locale');


const routerClient = express();

routerClient.use(express.static(path.join(__dirname, "public")));

routerClient.get('/client', async (req, res) => {
    const header = await getHeader();
    const blogs =  await getBlog();
    const footer = await getFooter();
    // @ts-ignore
    const user = req.session.user;
    res.render('general/general', {result: footer, chuDe: header, blogs : blogs ,user: user, header: '../general/header', footer: '../general/footer', main: '../general/main'});

})

module.exports = { routerClient };
