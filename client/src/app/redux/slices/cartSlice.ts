import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../utils/Types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product._id === product._id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },
  },
});

export default cartSlice.reducer;
export const { addItemToCart } = cartSlice.actions;


// removeItemFromCart: (state, action: PayloadAction<string>) => {
// 	state.items = state.items.filter(item => item._id !== action.payload)
// },
// updateCartItemQuantity: (
// 	state,
// 	action: PayloadAction<{ productId: string; quantity: number }>,
// ) => {
// 	const { productId, quantity } = action.payload
// 	const item = state.items.find(item => item._id === productId)
// 	if (item) {
// 		item.quantity = quantity
// 	}
// },
// clearCart: state => {
// 	state.items = []
// },
// removeItemFromCart,
// updateCartItemQuantity,
// clearCart,
