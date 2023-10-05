import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../utils/Types'

export const productSlice = createSlice({
	name: 'product',
	initialState: [] as Product[],
	reducers: {
		addProduct: (state, action) => {
			state.push(action.payload)
		},
	},
})

export default productSlice.reducer
export const { addProduct } = productSlice.actions
