const { Schema, model } = require('mongoose');

const validStatusTypes = ['pendiente', 'enviado', 'entregado', 'cancelado'];

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
    status: {
      type: String,
      required: true,
      enum: validStatusTypes
    },
    shippingAddress: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      postalCode: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    },
    paymentInfo: {
      cardType: {
        type: String,
        required: true
      },
      lastFourDigits: {
        type: String,
        required: true
      },
      expirationDate: {
        type: String,
        required: true
      }
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
