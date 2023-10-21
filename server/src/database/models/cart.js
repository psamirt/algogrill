const { Schema, model } = require('mongoose');
const Products = require('./product');

const cartItemSchema = new Schema({
  product: Products.schema,
  quantity: {
    type: Number,
    required: true
  }
});

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  items: [cartItemSchema]
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;
