import { Product } from '../../../utils/Types'
import { Dispatch } from 'redux'
import axios, { AxiosResponse } from 'axios'
import {
	addProduct,
	getProducts,
	updateProduct,
} from '../slices/productSlice'
import { AppDispatch } from 'app/store'
const baseUrl = import.meta.env.VITE_BASE_URL
// const localUrl = import.meta.env.VITE_LOCAL_URL

export const createProduct = (productData: Product) => {
	return async (dispatch: Dispatch) => {
		try {
			const response: AxiosResponse<Product> = await axios.post(
				`${baseUrl}/products/newProduct`,
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
				`${baseUrl}/products/getAllProducts`,
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
			 await axios.put(
				`${baseUrl}/products/upDateProduct/${productId}`,
				updatedProductData,
			)
			dispatch(
				updateProduct({
					...updatedProductData,
				}),
			)
		} catch (error) {
			console.error('Error al editar el producto', error)
		}
	}
}
