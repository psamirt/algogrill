import { addItemToCart } from 'app/redux/slices/cartSlice'
import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { Product } from 'utils/Types'
import { useAppSelector } from '../hooks/customHooks'

export const addProductsToCart = (productDetails: Product, quantity:number) => {
	const userId = useAppSelector((state)=> state.cart)
	return async (dispatch: Dispatch) => {
		try {
			const response: AxiosResponse = await axios.post(
				'http://localhost:3000/cart/addToCart',
				{
					productId: productDetails._id,
					quantity:quantity,
					userId: userId
				}
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
