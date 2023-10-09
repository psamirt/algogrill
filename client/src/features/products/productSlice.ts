import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../utils/Types'

export const productSlice = createSlice({
	name: 'product',
	initialState: [] as Product[],
	reducers: {
		addProduct: (state, action) => {
			state.push(action.payload)
		},
		getProducts: (_state, action: PayloadAction<Product[]>) => {
			return action.payload
		},
		updateProduct: (state, action: PayloadAction<Product>) => {
			const index = state.findIndex(
				product => product._id === action.payload._id,
			)
			if (index !== -1) {
				state[index] = action.payload
			}
			return state
		},
	},
})

export default productSlice.reducer
export const { addProduct, getProducts, updateProduct } = productSlice.actions
