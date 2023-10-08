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
			return action.payload;
		}
	},
})

export default productSlice.reducer
export const { addProduct, getProducts } = productSlice.actions
