const express = require('express');
const connection = require('../connectDB');

const routerGeneral = express.Router();

async function getHeader(){
    const query = "SELECT * FROM footerlienhe";
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                reject(err);
            } 
            else 
            {
                const result = rows.map(row => ({
                    diaChiLienHe: row.diaChiLienHe,
                    email: row.email,
                    facebook: row.facebook,
                    youtube: row.youtube,
                    thongTinBanQuyen: row.thongTinBanQuyen
                }));
                resolve(result);
            }
        });
    })
}

async function getFooter(){
    const query = "SELECT * FROM chude WHERE trangThai = true";
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                reject(err);
            } 
            else 
            {
                const result = rows.map(row => row.chuDe);
                resolve(result);
            }
        });
    })
}

routerGeneral.get('/', async (req,res) => {
    try {
        const header = await getHeader();
        const footer = await getFooter();
        res.render('general/main', { result: header, chude: footer, header: '../clients/header', footer: '../general/footer' });
    }
    catch (error) {
        console.error(error);
    }
})



const postHandlerByGeneral = (req, res) => {};
const putHandlerByGeneral = (req, res) => {};
const deleteHandlerByGeneral = (req, res) => {};

module.exports = { routerGeneral };
