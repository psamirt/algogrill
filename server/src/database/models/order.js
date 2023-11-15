import { Schema, model } from 'mongoose';
import { productSchema } from './product.js';

const validate = ['pending', 'payed', 'cancel'];

const orderItemSchema = new Schema({
  product: productSchema,
  quantity: {
    type: Number,
    default: 1,
  },
});

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [orderItemSchema],
    userDetails: {
      address: String,
      phoneNumber: String,
      reference: String,
    },
    status: {
      type: String,
      required: true,
      enum: validate,
      default: 'pending',
    },
    paymentInfo: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    collection: 'orders',
  }
);


const Order = model('Order', orderSchema);
export default Order;
