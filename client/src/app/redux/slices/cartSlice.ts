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
			const { quantity, userId, product } = action.payload
			const existingCartItem = state.items.find(
				item => item.product === product
			  )
			  if (existingCartItem) {
				existingCartItem.quantity += quantity
			  } else {
				state.items.push({ product, quantity, userId })
			  }
			},
		setCart: (state, action: PayloadAction<CartItem[]>) => {
			state.items = action.payload
		},
	},
})

export default cartSlice.reducer
export const { addItemToCart, setCart } = cartSlice.actions
