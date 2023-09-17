const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    user: [
      {
        name: {
          type: String
        },
        lastName: {
          type: String
        },
        imageProfile: {
          type: String,
          default:
            'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
        },
        email: {
          type: String,
          unique: true
        },
        password: {
          type: String
        },
        genre: {
          type: String
        },
        birthday: {
          type: String
        },
        location: [
          {
            city: {
              type: String
            },
            address: {
              type: String
            },
            postal_code: {
              type: Number
            }
          }
        ],
        card: [
          {
            productId: {
              type: String
            },
            quantity: {
              type: Number,
              default: 1
            },
            price: {
              type: Number
            },
            offer: {
              type: Number
            }
          }
        ],
        favorite: [
          {
            productId: {
              type: String
            },
            price: {
              type: Number
            },
            offer: {
              type: Number
            }
          }
        ],
        orders: [
          {
            user: {
              type: String
            },
            userId: {
              type: String
            },
            orderProducts: [
              {
                quantity: {
                  type: Number
                },
                price: {
                  type: Number
                },
                qualified: {
                  type: Boolean,
                  default: false
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
              }
            ],
            paymentInfo: [
              {
                status: {
                  type: String
                },
                amountPaid: {
                  type: Number
                }
              }
            ],
            orderStatus: {
              type: String
            },
            createdAt: {
              type: Date,
              default: Date.now
            }
          }
        ],
        ban: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

const Users = model('User', userSchema);
module.exports = Users;
