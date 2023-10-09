import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'app/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Product } from '../../../utils/Types'
import { fetchProduct } from '../../../app/actions/productActions'
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
		<div className='flex items-center justify-center mt-8'>
			{/* select option */}
			<div className=''>
				<h2 className='text-2xl'>Selecciona un producto</h2>
				<select 
        className='text-black' 
        name='product' 
        id='product'
        onChange={(e)=>handleProductSelected(e.target.value)}
        >
						<option value=''>Seleccionar</option>
					{products.map(product => (
            <option key={product._id} value={product._id}>{product.product_name}</option>
					))}
				</select>
			</div>
			{/* Form edit */}
      {selectedProduct && <EditProduct product= {selectedProduct} />}
		</div>
	)
}

export default ProductList

// <div className=' max-h-[full] h-full p-10'>
// 	<table className='min-w-full border rounded-lg '>
// 		<thead className='bg-gray-800 border'>
// 			<tr className='text-left uppercase'>
// 				<th className='py-2 px-4'>Nombre</th>
// 				<th className='py-2 px-4'>Tipo</th>
// 				<th className='py-2 px-4'>Precio</th>
// 				<th className='py-2 px-4'>Imagen</th>
// 				<th className='py-2 px-4'>Oferta</th>
// 				<th className='py-2 px-4'></th>
// 			</tr>
// 		</thead>
// 		<tbody className='bg-black'>
// 			{products.map(product => (
// 				<tr key={product._id}>
// 					<td className='py-2 px-4'>{product.product_name}</td>
// 					<td className='py-2 px-4'>{product.product_type}</td>
// 					<td className='py-2 px-4'>
// 						s/.{' '}
// 						{product.price.toLocaleString(undefined, {
// 							minimumFractionDigits: 2,
// 							maximumFractionDigits: 2,
// 						})}
// 					</td>
// 					<td className='py-2 px-4'>
// 						<img
// 							src={product.image}
// 							alt={product.product_name}
// 							className='h-10 w-10 object-cover rounded'
// 						/>
// 					</td>
// 					<td className='py-2 px-4'>{product.offers}</td>
// 					<button
//           onClick={()=> setSelectedProduct(product)}
//           className='bg-blue-500 mt-4 hover:bg-blue-400 text-white hover:scale-105 transition-transform duration-500 ease-in-out'>
// 						Editar
// 					</button>
// 				</tr>
// 			))}
// 		</tbody>
// 	</table>
// </div>
