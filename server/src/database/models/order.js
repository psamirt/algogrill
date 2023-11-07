import { Schema, model } from 'mongoose';
const validStatusTypes = ['pendiente', 'aceptado', 'enviado', 'entregado'];
const orderSchema = new Schema(
  {
    userId: {
      type: String,
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
        // required: true
      },
      address: {
        type: String,
        // required: true
      },
      reference: {
        type: String,
        // required: true
      }
    },
    status: {
      type: String,
      // required: true,
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
export default Order;
