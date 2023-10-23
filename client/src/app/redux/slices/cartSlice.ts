import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../../../utils/Types'

export interface CartState {
	items: CartItem[]
}

const initialState: CartState = {
	items: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemToCart: (state, action: PayloadAction<CartItem>) => {
			const { quantity, userId, productId } = action.payload
			const existingCartItem = state.items.find(
				item => item.productId === productId
			  )
			  if (existingCartItem) {
				existingCartItem.quantity += quantity
			  } else {
				state.items.push({ productId, quantity, userId })
			  }
			},
		setCart: (state, action: PayloadAction<CartItem[]>) => {
			state.items = action.payload
		},
	},
})

export default cartSlice.reducer
export const { addItemToCart, setCart } = cartSlice.actions
