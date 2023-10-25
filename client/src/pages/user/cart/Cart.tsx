import { useState } from 'react'
import { useAppSelector } from '../../../app/redux/hooks/customHooks'
import { useEffect } from 'react'
import { CartItem, Product } from '../../../utils/Types'
import { RiDeleteBin6Line } from 'react-icons/ri'

const Cart = () => {
	const cartState = useAppSelector(state => state.cart.items)
	const [cartProduct, setCartProduct] = useState<CartItem[]>([])
	const [totalPrice, setTotalPrice] = useState<number>(0)

	useEffect(() => {
		setCartProduct(cartState)

		// Calcular el precio total cuando el carrito cambie
		const totalPrice = cartState.reduce((total, cartItem) => {
			const itemPrice = cartItem.product.price * cartItem.quantity
			return total + itemPrice
		}, 0)

		setTotalPrice(totalPrice)
	}, [cartState])

	const calculateTotalPrice = (product: Product, quantity: number) => {
		return product.price * quantity
	}

	return (
		<div className='max-w-[1400px] mx-auto bg-slate-50 flex'>
			{/* cards */}
			<div className='w-[800px] m-7 '>
				<table className='min-w-full'>
					<thead className='bg-orange-300 '>
						<tr className='text-center uppercase '>
							<th className='py-2 px-4'>Producto</th>
							<th className='py-2 px-4'>Cantidad</th>
							<th className='py-2 px-4'>Precio</th>
							<th className='py-2 w-[20px]'></th>
						</tr>
					</thead>
					<tbody className='bg-red-100 font-bold'>
						{cartProduct.map(el => (
							<tr key={el.product._id} className='text-center'>
								<td className='py-2 px-4'>{el.product.product_name}</td>
								<td className='py-2 px-[50px]'>{el.quantity}</td>
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
								<td className='flex mt-3 '>
									<button className='hover:scale-110'>
										<RiDeleteBin6Line size={20} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className='flex justify-end'>
					<button className='text-white px-2 rounded-md hover:scale-105 duration-300 bg-orange-500 m-3'>
						Ir a pagar <span>s/. {totalPrice.toFixed(2)}</span>
					</button>
				</div>
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
