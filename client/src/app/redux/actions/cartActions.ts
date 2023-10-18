import { addItemToCart, setCart } from '../../../app/redux/slices/cartSlice'
import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'

export const addProductsToCart = (
	productDetails: string,
	quantity: number,
	userId: string,
) => {
	return async (dispatch: Dispatch) => {
		try {
			const response: AxiosResponse = await axios.post(
				'http://localhost:3000/cart/addToCart',
				{
					productId: productDetails,
					quantity: quantity,
					userId: userId,
				},
			)
			dispatch(addItemToCart(response.data.product))
		} catch (error) {
			console.error('Error al crear el carrito', error)
		}
	}
}

export const getCart = (userId: string) => {
	return async (dispatch: Dispatch) => {
		try {
			const response: AxiosResponse = await axios.get(
				`http://localhost:3000/cart/getCart/${userId}`,
			)
			dispatch(setCart(response.data.items))
		} catch (error) {
			console.error('Error al obtener el carrito', error)
		}
	}
}

