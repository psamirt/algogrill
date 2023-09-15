const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    product: [
      {
        product_name: {
          type: String,
          required: true
        },
        product_version: {
          type: String,
          required: true
        },
        image: {
          type: String,
          required: true
        },
        price: {
          type: String,
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
        rating: {
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
      }
    ]
  },
  {
    timestamps: true,
    collection: 'products'
  }
);

const Products = model('Products', productSchema);
module.exports = Products;
