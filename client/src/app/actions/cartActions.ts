import { addItemToCart } from 'features/cart/cartSlice'
import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { Product } from 'utils/Types'

export const addProductsToCart = (productDetails: Product) => {
	return async (dispatch: Dispatch) => {
		try {
			const response: AxiosResponse = await axios.post(
				'http://localhost:3000/cart/addToCart',
				productDetails,
			)
			dispatch(addItemToCart(response.data.product))
		} catch (error) {
			console.error('Error al crear el carrito', error)
		}
	}
}

// removeItemFromCart,
// updateCartItemQuantity,
// clearCart,
