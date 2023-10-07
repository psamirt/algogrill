import { Product } from '../../utils/Types'
import { Dispatch } from 'redux'
import axios, { AxiosResponse } from 'axios'

interface ProductCreatedAction {
	type: 'PRODUCT_CREATED'
	payload: Product
}

export const createProduct = (productData: Product) => {
	return async (dispatch: Dispatch<ProductCreatedAction>) => {
		try {
			const response: AxiosResponse<Product> = await axios.post(
				'http://localhost:3000/products/newProduct',
				productData,
			)
			dispatch({
				type: 'PRODUCT_CREATED',
				payload: response.data,
			} as ProductCreatedAction)
			console.log(response);
		} catch (error) {
			console.error('Error al crear el producto', error)
		}
	}
}
