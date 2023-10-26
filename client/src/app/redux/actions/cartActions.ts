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

const socket = io('http://localhost:3000')

export const addProductsToCart = (
	product: Product,
	quantity: number,
	userId: string,
) => {
	return async (dispatch: Dispatch) => {
		try {
			const response: AxiosResponse = await axios.post(
				'http://localhost:3000/cart/addToCart',
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
				`http://localhost:3000/cart/getCart/${userId}`,
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
			await axios.delete(`http://localhost:3000/cart/deleteProduct/${userId}`, {
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
			await axios.put(`http://localhost:3000/cart/updateQuantity/${userId}`, {
				productId,
				quantity,
			})
			dispatch(updateQuantity({ productId, quantity }))
		} catch (error) {
			// Maneja errores aquí
			console.error(
				'Error al actualizar la cantidad del producto en el carrito',
				error,
			)
		}
	}
}
