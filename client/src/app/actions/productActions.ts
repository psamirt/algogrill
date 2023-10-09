import { Product } from '../../utils/Types'
import { Dispatch } from 'redux'
import axios, { AxiosResponse } from 'axios'
import {
	addProduct,
	getProducts,
	updateProduct,
} from '../../features/products/productSlice'
import { AppDispatch } from 'app/store'

export const createProduct = (productData: Product) => {
	return async (dispatch: Dispatch) => {
		try {
			const response: AxiosResponse<Product> = await axios.post(
				'http://localhost:3000/products/newProduct',
				productData,
			)
			dispatch(addProduct(response.data))
			console.log(response)
		} catch (error) {
			console.error('Error al crear el producto', error)
		}
	}
}

export const fetchProduct = () => {
	return async (dispatch: Dispatch) => {
		try {
			const response: AxiosResponse = await axios.get(
				'http://localhost:3000/products/getAllProducts',
			)
			dispatch(getProducts(response.data))
		} catch (error) {
			console.error('Error al obtener los productos', error)
		}
	}
}

export const editProduct = (productId: string, updatedProductData: Product) => {
	return async (dispatch: AppDispatch) => {
		try {
			const response: AxiosResponse<Product> = await axios.put(
				`http://localhost:3000/products/upDateProduct/${productId}`,
				updatedProductData,
			)
			dispatch(updateProduct(response.data))
		} catch (error) {
			console.error('Error al editar el producto', error)
		}
	}
}
