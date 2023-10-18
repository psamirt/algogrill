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
      const { productId, quantity, userId } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.productId === productId);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += quantity
      }else {
        state.items.push({productId, quantity, userId})
      }
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { addItemToCart, setCart } = cartSlice.actions;
