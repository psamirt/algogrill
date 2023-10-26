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
				item => item.product === product,
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
		deleteItem: (state, action: PayloadAction<string | undefined>) => {
			const productIdToDelete = action.payload
			state.items = state.items.filter(
				item => item.product._id !== productIdToDelete,
			)
		},
		updateQuantity: (
			state,
			action: PayloadAction<{
				productId: string | undefined
				quantity: number
			}>,
		) => {
			const { productId, quantity } = action.payload
			const cartItemToUpdate = state.items.find(
				item => item.product._id === productId,
			)
			if (cartItemToUpdate) {
				cartItemToUpdate.quantity = quantity
			}
		},
	},
})

export default cartSlice.reducer
export const { addItemToCart, setCart, deleteItem, updateQuantity } =
	cartSlice.actions
