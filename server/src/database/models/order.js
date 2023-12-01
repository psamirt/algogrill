import { Schema, model } from 'mongoose';

const validate = ['pending', 'payed', 'cancel'];

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    cartId: {
      type: String,
      required: true
    },
    userDetails: {
      address: String,
      phoneNumber: String,
      reference: String
    },
    status: {
      type: String,
      required: true,
      enum: validate,
      default: 'pending'
    },
    paymentInfo: {
      type: Schema.Types.Mixed
    },
    total_amount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'orders'
  }
);

const Order = model('Order', orderSchema);
export default Order;
