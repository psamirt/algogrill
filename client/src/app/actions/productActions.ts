import { Product } from '../../utils/Types'
import { Dispatch } from 'redux'
import axios, { AxiosResponse } from 'axios'
import {addProduct, getProducts}from '../../features/products/productSlice'



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
