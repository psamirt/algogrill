import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    shippingAddress: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      // required: true,
    },
    paymentInfo: {
      type: Schema.Types.Mixed,
    },
    customerNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'orders',
  }
);

const Order = model('Order', orderSchema);
export default Order;
