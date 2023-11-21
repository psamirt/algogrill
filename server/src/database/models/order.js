import { Schema, model } from 'mongoose';

const validate = ['pending', 'payed', 'cancel'];

const orderItemSchema = new Schema({
  category: {
    type: String
  },
  description: {
    type: String
  },
  title: {
    type: String
  },
  quantity: {
    type: Number,
    default: 1
  },
  unit_price: {
    type: Number
  }
});

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    items: [orderItemSchema],
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
