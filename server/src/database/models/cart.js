import { Schema, model } from 'mongoose';
import { productSchema } from './product.js';

const cartItemSchema = new Schema({
  product: productSchema,
  quantity: {
    type: Number,
    required: true
  },
});

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  items: [cartItemSchema]
});

const Cart = model('Cart', cartSchema);

export default Cart;


// additional: {
//   toppings: {
//     type: {
//       chasse: {
//         price: Number,
//         type: Boolean,
//         default: false
//       },
//       bacon: {
//         price: Number,
//         type: Boolean,
//         default: false
//       },
//       egg: {
//         price: Number,
//         type: Boolean,
//         default: false
//       },
//       ham: {
//         price: Number,
//         type: Boolean,
//         default: false
//       },
//       pineapple: {
//         price: Number,
//         type: Boolean,
//         default: false
//       },
//       banana: {
//         price: Number,
//         type: Boolean,
//         default: false
//       },
//       pickles: {
//         price: Number,
//         type: Boolean,
//         default: false
//       }
//     }
//   },
//   drinks: {
//     type: {
//       beers: {
//         pilsen: {
//           price: Number,
//           type: Boolean,
//           default: false
//         },
//         cusqueña: {
//           price: Number,
//           type: Boolean,
//           default: false
//         },
//         cristal: {
//           price: Number,
//           type: Boolean,
//           default: false
//         },
//         Budweiser: {
//           price: Number,
//           type: Boolean,
//           default: false
//         },
//         heineken: {
//           price: Number,
//           type: Boolean,
//           default: false
//         },
//         stella: {
//           price: Number,
//           type: Boolean,
//           default: false
//         }
//       }
//     }
//   },
//   salsas: {
//     type: {
//       ketchup: {
//         type: Boolean,
//         price: Number,
//         default: false
//       },
//       mayonnaise: {
//         type: Boolean,
//         price: Number,
//         default: false
//       },
//       mustard: {
//         type: Boolean,
//         price: Number,
//         default: false
//       },
//       aji: {
//         type: Boolean,
//         price: Number,
//         default: false
//       },
//       guacamole: {
//         type: Boolean,
//         price: Number,
//         default: false
//       }
//     }
//   }
// }