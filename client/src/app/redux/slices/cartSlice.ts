import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../../utils/Types';

export interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { productId, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.productId === productId);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += quantity
      }else {
        state.items.push({productId, quantity})
      }
    },
  },
});

export default cartSlice.reducer;
export const { addItemToCart } = cartSlice.actions;
