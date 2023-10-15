import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../utils/Types'

interface CartState {
	items: Product[]
}

const initialState: CartState = {
	items: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemToCart: (state, action: PayloadAction<Product>) => {
			state.items.push(action.payload)
		},
	},
})

export default cartSlice.reducer
export const { addItemToCart } = cartSlice.actions

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
