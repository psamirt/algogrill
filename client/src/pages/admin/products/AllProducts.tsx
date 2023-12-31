import { useEffect } from 'react'
import { fetchProduct } from '../../../app/redux/actions/productActions'
import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks/customHooks'

const AllProducts = () => {
	const dispatch= useAppDispatch()
	const products = useAppSelector((state) => state.product)

	useEffect(() => {
		dispatch(fetchProduct())
	}, [dispatch])

	return (
		<div className=' max-h-[full] h-full p-8 text-white'>
			<table className='min-w-full border rounded-lg '>
				<thead className='bg-gray-800 border'>
					<tr className='text-left uppercase'>
						<th className='py-2 px-4'>Nombre</th>
						<th className='py-2 px-4'>Tipo</th>
						<th className='py-2 px-4'>Precio</th>
						<th className='py-2 px-4'>Imagen</th>
						<th className='py-2 px-4'>Oferta</th>
					</tr>
				</thead>
				<tbody className='bg-black'>
					{products.map(product => (
						<tr key={product._id}>
							<td className='py-2 px-4'>{product.product_name}</td>
							<td className='py-2 px-4'>{product.product_type}</td>
							<td className='py-2 px-4'>
								s/.{' '}
								{product.price.toLocaleString(undefined, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</td>
							<td className='py-2 px-4'>
								<img
									src={product.image}
									alt={product.product_name}
									className='h-10 w-10 object-cover rounded'
								/>
							</td>
							<td className='py-2 px-4'>{product.offers}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default AllProducts
