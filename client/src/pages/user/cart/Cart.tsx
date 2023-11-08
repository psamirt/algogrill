import { useState } from 'react'
import {
	useAppDispatch,
	useAppSelector,
} from '../../../app/redux/hooks/customHooks'
import { useEffect } from 'react'
import { CartItem, Product } from '../../../utils/Types'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useAuth } from '../../../context/AuthContext'
import toast from 'react-hot-toast'
import {
	deleteProductFromCart,
	updateQuantityCart,
} from '../../../app/redux/actions/cartActions'

const Cart = () => {
	const cartState = useAppSelector(state => state.cart.items)
	const [cartProduct, setCartProduct] = useState<CartItem[]>([])
	const [totalPrice, setTotalPrice] = useState<number>(0)
	const { user } = useAuth()
	const dispatch = useAppDispatch()

	useEffect(() => {
		setCartProduct(cartState)
		const totalPrice = cartState.reduce((total: number, cartItem: CartItem) => {
			const itemPrice = cartItem.product.price * cartItem.quantity
			return total + itemPrice
		}, 0)
		setTotalPrice(totalPrice)
	}, [cartState])

	const handleQuantityChange = (productId: string, newQuantity: number) => {
		if (user) {
			dispatch(updateQuantityCart(user.uid, productId, newQuantity))
			toast.success('Cantidad actualizada exitosamente')
		}
	}

	const handleDelete = (
		userId: string | undefined,
		productId: string | undefined,
	) => {
		if (userId) {
			const confirmed = window.confirm(
				'¿Estás seguro de que quieres eliminar este producto del carrito?',
			)
			if (confirmed) {
				dispatch(deleteProductFromCart(userId, productId))
				toast.success('Producto eliminado exitosamente')
			}
		}
	}

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
								<td className='py-2 px-[50px]'>
									<input
									className='w-8'
										type='number'
										value={el.quantity}
										onChange={e =>
											handleQuantityChange(
												el.product._id,
												parseInt(e.target.value),
											)
										}
									/>
								</td>
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
									<button
										onClick={() => handleDelete(user?.uid, el.product._id)}
										className='hover:scale-110'
									>
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
