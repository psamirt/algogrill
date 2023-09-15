const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    product_name: {
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
    },
    additional: {
      type: {
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
    }
  },
  {
    timestamps: true
  }
);

const Products = model('Products', productSchema);
