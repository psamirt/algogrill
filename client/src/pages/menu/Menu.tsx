import { useEffect } from 'react'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'app/store'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from 'utils/Types'
import { fetchProduct } from '../../app/actions/productActions'

const Menu = () => {
	const products = useSelector((state: RootState): Product[] => state.product)
	const dispatch: ThunkDispatch<RootState, unknown, AnyAction> =
		useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(fetchProduct())
	}, [dispatch])

	return (
		<div className='grid grid-cols-2 lg:grid-cols-4 gap-6 p-4 max-w-[1400px] mx-auto'>
			{products.map(product => (
				<div key={product._id} className='border shadow-lg rounded-lg'>
					<img
						src={product.image}
						alt={product.product_name}
						className='w-full h-[200px] object-cover rounded-t-lg hover:scale-105 duration-300'
					/>
					<div className='flex justify-between px-2 py-4 '>
						<p className='font-bold'>{product.product_name}</p>
						<p>
							<span className='bg-orange-500 text-white px-2 rounded-full'>
								./S {product.price}
							</span>
						</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default Menu
