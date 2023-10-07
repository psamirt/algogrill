const { Schema, model } = require('mongoose');

const validProductTypes = ['hamburguesa', 'salchipapa', 'alitas'];

const productSchema = new Schema(
  {
    product_type: {
      type: String,
      required: true,
      enum: validProductTypes
    },
    product_name: {
      type: String,
      required: true,
      // unique: true
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
    },
    rating: [
      {
        stars: {
          type: [Number]
        },
        totalStars: {
          type: Number
        },
        comments: {
          type: [String]
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Products = model('Products', productSchema);
module.exports = Products;
