const { Schema, model } = require('mongoose');

const validStatusTypes = ['pendiente', 'enviado', 'entregado', 'cancelado'];

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
    status: {
      type: String,
      required: true,
      enum: validStatusTypes
    },
    shippingAddress: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      postalCode: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    },
    paymentInfo: {
      cardType: {
        type: String,
        required: true
      },
      lastFourDigits: {
        type: String,
        required: true
      },
      expirationDate: {
        type: String,
        required: true
      }
    },
    customerNotes: {
      type: String
    },
    additional: {
      toppings: {
        type: {
          chasse: {
            price: Number,
            type: Boolean,
            default: false
          },
          bacon: {
            price: Number,
            type: Boolean,
            default: false
          },
          egg: {
            price: Number,
            type: Boolean,
            default: false
          },
          ham: {
            price: Number,
            type: Boolean,
            default: false
          },
          pineapple: {
            price: Number,
            type: Boolean,
            default: false
          },
          banana: {
            price: Number,
            type: Boolean,
            default: false
          },
          pickles: {
            price: Number,
            type: Boolean,
            default: false
          }
        }
      },
      drinks: {
        type: {
          beers: {
            pilsen: {
              price: Number,
              type: Boolean,
              default: false
            },
            cusqueña: {
              price: Number,
              type: Boolean,
              default: false
            },
            cristal: {
              price: Number,
              type: Boolean,
              default: false
            },
            Budweiser: {
              price: Number,
              type: Boolean,
              default: false
            },
            heineken: {
              price: Number,
              type: Boolean,
              default: false
            },
            stella: {
              price: Number,
              type: Boolean,
              default: false
            }
          }
        }
      },
      salsas: {
        type: {
          ketchup: {
            type: Boolean,
            price: Number,
            default: false
          },
          mayonnaise: {
            type: Boolean,
            price: Number,
            default: false
          },
          mustard: {
            type: Boolean,
            price: Number,
            default: false
          },
          aji: {
            type: Boolean,
            price: Number,
            default: false
          },
          guacamole: {
            type: Boolean,
            price: Number,
            default: false
          }
        }
      }
    }
  },
  {
    timestamps: true,
    collection: 'orders'
  }
);

const Order = model('Order', orderSchema);
module.exports = Order;
