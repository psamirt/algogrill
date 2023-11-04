import dotenv from 'dotenv';
dotenv.config();
import { MercadoPagoConfig } from 'mercadopago';
import axios from 'axios';
import Order from '../database/models/order.js';
import Cart from '../database/models/cart.js';

export const createOrder = async (req, res) => {
  const client = MercadoPagoConfig({
    accessToken: ''
  });
};

export const captureOrder = async (req, res) => {};
