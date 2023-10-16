import { addItemToCart } from 'features/cart/cartSlice'
import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { Product } from 'utils/Types'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store'

export const addProductsToCart = (productDetails: Product, quantity:number) => {
	const userId = useSelector((state: RootState)=> state.user)
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
