import { product } from '../../utils/api'
import { Product } from '../../utils/Types'
import { Dispatch } from 'redux'
import { AxiosResponse } from 'axios'

interface ProductCreatedAction {
	type: 'PRODUCT_CREATED'
	payload: Product
}

export const createProduct = (productData: Product) => {
	return async (dispatch: Dispatch<ProductCreatedAction>) => {
		try {
			const response: AxiosResponse<Product> = await product.post(
				'product/newProduct',
				productData,
			)
			dispatch({
				type: 'PRODUCT_CREATED',
				payload: response.data,
			} as ProductCreatedAction)
		} catch (error) {
			console.error('Error al crear el producto', error)
		}
	}
}
