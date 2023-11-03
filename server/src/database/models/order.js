const { Schema, model } = require('mongoose');
const validStatusTypes = ['pendiente', 'aceptado', 'enviado', 'entregado'];
const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    shippingAddress: {
      city: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      reference: {
        type: String,
        required: true
      }
    },
    status: {
      type: String,
      required: true,
      enum: validStatusTypes
    },
    paymentInfo: {
      type: Schema.Types.Mixed
    },
    customerNotes: {
      type: String
    }
  },
  {
    timestamps: true,
    collection: 'orders'
  }
);

const Order = model('Order', orderSchema);
module.exports = Order;
