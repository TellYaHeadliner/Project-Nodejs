const express = require('express');
const connection = require('../connectDB');

const app = express();

const getMainByGeneral = (req, res) => {
    const query = "SELECT * FROM footerlienhe";
    const query2 = "SELECT chuDe FROM chude WHERE trangThai = true";

    Promise.all([
        new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.map(row => ({
                        diaChiLienHe: row.diaChiLienHe,
                        email: row.email,
                        facebook: row.facebook,
                        youtube: row.youtube,
                        thongTinBanQuyen: row.thongTinBanQuyen
                    })));
                }
            });
        }),
        new Promise((resolve, reject) => {
            connection.query(query2, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.map(row => row.chuDe));
                }
            });
        })
    ])
    .then(([footerlienhe, chude]) => {
        res.render('clients/main', {result: footerlienhe, chude: chude});
    })
    .catch(err => {
        // Handle errors
        console.error("Error:", err);
        res.status(500).json({ error: "An error occurred while fetching data." });
    });
    
};

const postHandlerByGeneral = (req, res) => {};
const putHandlerByGeneral = (req, res) => {};
const deleteHandlerByGeneral = (req, res) => {};

module.exports = { getMainByGeneral, postHandlerByGeneral, putHandlerByGeneral ,deleteHandlerByGeneral};
