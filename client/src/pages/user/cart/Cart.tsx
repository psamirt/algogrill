import { useState } from 'react'
import { useAppSelector } from '../../../app/redux/hooks/customHooks'
import { useEffect } from 'react'
import { CartItem, Product } from '../../../utils/Types'

const Cart = () => {
	const cartState = useAppSelector(state => state.cart.items)
	const [cartProduct, setCartProduct] = useState<CartItem[]>([])

	useEffect(() => {
		setCartProduct(cartState)
	}, [cartState])

	const calculateTotalPrice = (product: Product, quantity: number) => {
		return product.price * quantity
	}

	return (
		<div className='max-w-[1400px] mx-auto bg-slate-50 flex justify-between'>
			{/* cards */}
			<div className='w-[800px] m-7'>
				<table className='min-w-full border rounded-lg '>
					<thead className='bg-slate-200 border'>
						<tr className='text-left uppercase '>
							<th>Producto</th>
							<th>Cantidad</th>
							<th>Precio</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{cartProduct.map(el => (
							<tr>
								<td>{el.product.product_name}</td>
								<td>{el.quantity}</td>
								<td>
									s/.{' '}
									{calculateTotalPrice(el.product, el.quantity).toLocaleString(
										undefined,
										{
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										},
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<button>pagar</button>
			</div>
			{/* pagar */}
			<div className='w-[400px]'>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, maiores,
				ratione recusandae veniam earum asperiores magni sint praesentium
				doloremque consequuntur deleniti beatae porro! Corrupti esse vero,
				expedita sequi suscipit molestiae.
			</div>
		</div>
	)
}

export default Cart
