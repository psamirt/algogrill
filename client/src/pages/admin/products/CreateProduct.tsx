import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../../features/products/productSlice'
import { validProductTypes } from '../../../utils/Types.ts'

const CreateProduct: React.FC = () => {
	const dispatch = useDispatch()
	const [disable, setDisable] = useState(true)
	const [product, setProduct] = useState({
		product_type: '',
		product_name: '',
		image: '',
		price: 0,
		description: '',
		offers: 0,
	})

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target
		setProduct({ ...product, [name]: value })
	}

	useEffect(() => {
		if (
			product.product_type === '' ||
			product.product_name === '' ||
			product.image === '' ||
			product.price === 0 ||
			product.description === ''
		) {
			setDisable(true)
		} else {
			setDisable(false)
		}
	})
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(addProduct(product))
		setProduct({
			product_type: '',
			product_name: '',
			image: '',
			price: 0,
			description: '',
			offers: 0,
		})
	}

	return (
		<div className='max-w-lg mx-auto my-10 p-6 bg-slate-800 rounded-lg '>
			<h2 className='text-2xl mb-4 text-center'>Nuevo Producto</h2>
			<hr />
			<form className='m-4' onSubmit={handleSubmit}>
				<ul className='mb-4'>
					<li className='p-3'>
						Tipo de Producto:
						<select
							className=' appearance-none w-full border border-gray-300 py-3 px-4 rounded-lg focus:border-green-500
							outline-none focus:ring-1 focus:ring-green-500 text-black'
							name='product_type'
							value={product.product_type}
							onChange={handleInputChange}
							required
						>
							<option value=''>Selecciona un tipo</option>
							{validProductTypes.map(type => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</li>
					<li className='p-3'>
						Nombre del Producto:
						<input
							className='w-full border border-gray-300 py-2 px-3 rounded-lg focus:border-green-500
							outline-none focus:ring-1 focus:ring-green-500 text-black'
							type='text'
							name='product_name'
							value={product.product_name}
							onChange={handleInputChange}
							required
						/>
					</li>
					<li className='p-3'>
						Ingresar imagen:
						<input
							type='text'
							className='w-full border border-gray-300 py-2 px-4 rounded-lg focus:border-green-500
							outline-none focus:ring-1 focus:ring-green-500 text-black'
							name='image'
							value={product.image}
							onChange={handleInputChange}
							required
						/>
					</li>
					<li className='p-3'>
						Precio
						<input
							className='w-full border border-gray-300 py-2 px-4 rounded-lg focus:border-green-500
							outline-none focus:ring-1 focus:ring-green-500 text-black'
							type='number'
							name='price'
							value={product.price}
							onChange={handleInputChange}
							required
						/>
					</li>
					<li className='p-3'>
						Descripción
						<textarea
							className='w-full border border-gray-300 py-2 px-4 rounded-lg focus:border-green-500
							outline-none focus:ring-1 focus:ring-green-500 text-black'
							name='description'
							value={product.description}
							onChange={handleInputChange}
							required
						/>
					</li>
					<li className='p-3'>
						Oferta
						<input
							className='w-full border border-gray-300 py-2 px-4 rounded-lg focus:border-green-500
							outline-none focus:ring-1 focus:ring-green-500 text-black'
							type='number'
							name='offers'
							value={product.offers}
							onChange={handleInputChange}
							required
						/>
					</li>
				</ul>

				<button
					type='submit'
					className={`${
						disable
							? 'bg-slate-300 text-2xl text-black'
							: 'bg-blue-500 text-2xl text-white hover:scale-105 transition-transform duration-500 ease-in-out'
					}rounded-lg flex mx-auto`}
					disabled={disable}
				>
					Crear
				</button>
			</form>
		</div>
	)
}

export default CreateProduct
