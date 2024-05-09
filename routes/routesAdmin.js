const express = require('express');
const getFooter = require('../middleware/getFooter')
const getHeader = require('../middleware/getHeader')


const routerAdmin = express();

routerAdmin.get('/admin', async (req, res) => {
    const header = await getHeader()
    const footer = await getFooter();
    // @ts-ignore
    const user = req.session.username;
    res.render('general/general', {result: footer, user: user, chuDe: header, header: '../admin/header_admin', footer: '../general/footer' });
})

module.exports = { routerAdmin };
