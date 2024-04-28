const express = require('express');
const connection = require('../connectDB');

const app = express();

const getHandlerByClient = (req, res) => {
};
const postHandlerByClient = (req, res) => {};
const putHandlerByClient = (req, res) => {};
const deleteHandlerByClient = (req, res) => {};

module.exports = {  getHandlerByClient, postHandlerByClient, putHandlerByClient , deleteHandlerByClient};
