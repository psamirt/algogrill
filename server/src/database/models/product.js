import { Schema, model } from 'mongoose';

const validProductTypes = ['hamburguesa', 'salchipapa', 'alitas'];

export const productSchema = new Schema(
  {
    product_type: {
      type: String,
      required: true,
      enum: validProductTypes
    },
    product_name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    disable: {
      type: Boolean,
      default: false
    },
    offers: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Products = model('Products', productSchema);
export default Products;
