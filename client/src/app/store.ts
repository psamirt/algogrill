import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/cart/cartSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
	reducer: {
		product: productReducer,
		cart: cartReducer,
		user: userReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
