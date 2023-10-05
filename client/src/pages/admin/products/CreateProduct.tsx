import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../../features/products/productSlice'
import { validProductTypes } from '../../../utils/Types.ts'

const CreateProduct: React.FC = () => {
	const dispatch = useDispatch()
	const [product, setProduct] = useState({
		product_type: '',
		product_name: '',
		product_version: '',
		image: '',
		price: '',
		description: '',
		disable: false,
		offers: 0,
	})

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target
		setProduct({ ...product, [name]: value })
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(addProduct(product))
		setProduct({
			product_type: '',
			product_name: '',
			product_version: '',
			image: '',
			price: '',
			description: '',
			disable: false,
			offers: 0,
		})
	}

	return (
		<div className='product-form'>
			<h2>Nuevo Producto</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Tipo de Producto:
					<select
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
				</label>
				<label>
					Nombre del Producto:
					<input
						type='text'
						name='product_name'
						value={product.product_name}
						onChange={handleInputChange}
						required
					/>
				</label>
				{/* Agrega más campos del producto según sea necesario */}
				<button type='submit'>Crear Producto</button>
			</form>
		</div>
	)
}

export default CreateProduct
