require('dotenv').config();
const { HOST } = process.env;
const axios = require('axios');
const Order = require('../database/models/order');
const Cart = require('../database/models/cart');

const createSession = async (req, res) => {

};

const captureOrder = async (req, res) => {

};

module.exports = {
  createSession,
  captureOrder
};
