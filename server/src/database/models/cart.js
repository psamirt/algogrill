const { Schema, model } = require('mongoose');

const cartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  },
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
