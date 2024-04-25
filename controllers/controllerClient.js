const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));


const getHandlerByClient = (req, res) => {
    res.render("clients/main")
};
const postHandlerByClient = (req, res) => {};
const putHandlerByClient = (req, res) => {};
const deleteHandlerByClient = (req, res) => {};

module.exports = {  getHandlerByClient, postHandlerByClient, putHandlerByClient , deleteHandlerByClient };
