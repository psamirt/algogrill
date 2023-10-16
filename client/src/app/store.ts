import { configureStore } from '@reduxjs/toolkit'
import productReducer from './redux/slices/productSlice'
import cartReducer from './redux/slices/cartSlice'
import userReducer from './redux/slices/userSlice'

export const store = configureStore({
	reducer: {
		product: productReducer,
		cart: cartReducer,
		user: userReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
