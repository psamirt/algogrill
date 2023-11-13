import { Schema, model, Types } from 'mongoose';
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
    _id: {
      type: String, // Puedes ajustar el tipo según tus necesidades
      // required: true,
      // Otros validadores o configuraciones según tus requisitos
    },
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

// Antes de compilar el modelo, puedes agregar un gancho (hook) para asignar el valor del _id
orderSchema.pre('save', function (next) {
  // Verifica si _id ya está definido (puede haberse establecido manualmente)
  if (!this._id) {
    // Asigna un nuevo valor al campo _id si no está definido
    this._id = Types.ObjectId(); // Puedes ajustar el valor según tus necesidades
  }
  next();
});

const Order = model('Order', orderSchema);
export default Order;
