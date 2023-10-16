import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'app/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Product } from '../../../utils/Types'
import { fetchProduct } from '../../../app/redux/actions/productActions'
import EditProduct from './EditProduct'

const ProductList: React.FC = () => {
	const dispatch: ThunkDispatch<RootState, unknown, AnyAction> =
		useDispatch<AppDispatch>()
	const products = useSelector((state: RootState): Product[] => state.product)
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

	useEffect(() => {
		dispatch(fetchProduct())
	}, [dispatch])

	const handleProductSelected = (productId: string) => {
		const selected = products.find(product => product._id === productId)
		if (selected) {
			setSelectedProduct(selected)
		}
	}

	return (
		<div className='max-w-lg mx-auto my-10 p-6 bg-slate-800 rounded-lg text-white'>
			{/* select option */}
			<div className=''>
				<h2 className='text-2xl'>Selecciona un producto</h2>
				<select
					className='mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 bg-white text-gray-900'
					name='product'
					id='product'
					onChange={e => handleProductSelected(e.target.value)}
				>
					<option value=''>Seleccionar</option>
					{products.map(product => (
						<option key={product._id} value={product._id}>
							{product.product_name}
						</option>
					))}
				</select>
			</div>
			{/* Form edit */}
			{selectedProduct && <EditProduct product={selectedProduct} />}
		</div>
	)
}

export default ProductList

