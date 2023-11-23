import {
	addItemToCart,
	deleteItem,
	setCart,
	updateQuantity,
} from '../../../app/redux/slices/cartSlice'
import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { Product } from 'utils/Types'
import { io } from 'socket.io-client'
// const baseUrl = import.meta.env.VITE_BASE_URL
const localUrl = import.meta.env.VITE_LOCAL_URL
const socket = io(localUrl)

export const addProductsToCart = (
	product: Product,
	quantity: number,
	userId: string,
) => {
	return async (dispatch: Dispatch) => {
		try {
			const response: AxiosResponse = await axios.post(
				`${localUrl}/cart/addToCart`,
				{
					product: product,
					quantity: quantity,
					userId: userId,
				},
			)
			const updatedCart = response.data
			dispatch(addItemToCart(updatedCart))
			socket.emit('productAddedToCart', { quantity })
		} catch (error) {
			console.error('Error al añadir el producto al carrito', error)
		}
	}
}

export const getCart = (userId: string) => {
	return async (dispatch: Dispatch) => {
		try {
			const response: AxiosResponse = await axios.get(
				`${localUrl}/cart/getCart/${userId}`,
			)
			dispatch(setCart(response.data.items))
		} catch (error) {
			console.error('Error al obtener el carrito', error)
		}
	}
}

export const deleteProductFromCart = (
	userId: string | undefined,
	productId: string | undefined,
) => {
	return async (dispatch: Dispatch) => {
		try {
			await axios.delete(`${localUrl}/cart/deleteProduct/${userId}`, {
				data: { productId },
			})
			dispatch(deleteItem(productId))
		} catch (error) {
			console.error('Error al eliminar el producto del carrito', error)
		}
	}
}

export const updateQuantityCart = (
	userId: string | undefined,
	productId: string | undefined,
	quantity: number,
) => {
	return async (dispatch: Dispatch) => {
		try {
			await axios.put(`${localUrl}/cart/updateQuantity/${userId}`, {
				productId,
				quantity,
			})
			dispatch(updateQuantity({ productId, quantity }))
		} catch (error) {
			console.error(
				'Error al actualizar la cantidad del producto en el carrito',
				error,
			)
		}
	}
}

export const cleanupCart = () => {
	return (dispatch: Dispatch) => {
		dispatch(setCart([]))
	}
}

export const payment = async (
	userId: string,
	shippingData: { address: string; phoneNumber: string; reference: string }
  ) => {
	try {
	  const response = await axios.post(`${localUrl}/order/createOrder/${userId}`, {
		...shippingData,
	  });
	  window.location.href = response.data.init_point;
	} catch (error) {
	  console.error('Error al pagar el carrito', error);
	}
  };
