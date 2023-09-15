const { Schema, model } = require('mongoose');

const versions = ['Base Grill', 'Taquicardia', 'Tapartereas', 'Glucosa'];

const productSchema = new Schema(
  {
    hamburguesa: {
      product_version: {
        type: String,
        enum: versions,
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
      favorite: {
        type: [String],
        default: []
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
  },
  {
    timestamps: true,
    collection: 'products'
  }
);

const Products = model('Products', productSchema);
module.exports = Products;
