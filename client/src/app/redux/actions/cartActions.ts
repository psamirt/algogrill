import { addItemToCart, setCart } from '../../../app/redux/slices/cartSlice'
import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { Product } from 'utils/Types';

export const addProductsToCart = (product: Product, quantity: number, userId: string) => {
	return async (dispatch: Dispatch) => {
	  try {
		const response: AxiosResponse = await axios.post(
		  'http://localhost:3000/cart/addToCart',
		  {
			product: product,
			quantity: quantity,
			userId: userId,
		  },
		);
		const updatedCart = response.data;
		dispatch(addItemToCart(updatedCart));
	  } catch (error) {
		console.error('Error al añadir el producto al carrito', error);
	  }
	};
  };
  
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

