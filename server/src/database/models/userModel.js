const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firebaseUserId: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
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
    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        },
        quantity: {
          type: Number,
          default: 1
        },
        price: {
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
        orderId: {
          type: Schema.Types.ObjectId,
          ref: 'Order'
        }
      }
    ],
    isBanned: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

const Users = model('User', userSchema);
module.exports = Users;
