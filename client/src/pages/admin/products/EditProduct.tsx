import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { editProduct } from '../../../app/actions/productActions'
import { RootState } from 'app/store'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Product } from '../../../utils/Types'

const EditProduct: React.FC<{ product: Product }> = ({ product }) => {
	const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
	const [editedProduct, setEditedProduct] = useState<Product>(product)
	console.log(editedProduct)

	useEffect(() => {
		setEditedProduct(product)
	}, [product])

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target
		setEditedProduct((prevProduct: Product) => ({
			...prevProduct,
			[name as keyof Product]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const productId = product._id
			if (!productId) {
				throw new Error('El ID del producto no puede ser null')
			}
			await dispatch(editProduct(productId, editedProduct))
			toast.success('Cambios guardados exitosamente', { duration: 4000 })
		} catch (error) {
			toast.error('Error al guardar cambios', { duration: 4000 })
		}
	}

	return (
		<div className='max-h-[100vh] mx-auto my-10 p-6 bg-slate-800 rounded-lg '>
			<h2 className='text-2xl mb-4 text-center'>Nuevo Producto</h2>
			<hr />
			<form className='m-4' onSubmit={handleSubmit}>
				<ul className='mb-4'>
					<li className='p-3'>
						Nombre del Producto:
						<input
							className='w-full border border-gray-300 py-2 px-3 rounded-lg focus:border-green-500
                    outline-none focus:ring-1 focus:ring-green-500 text-black'
							type='text'
							name='product_name'
							value={editedProduct.product_name}
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
							value={editedProduct.image}
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
							value={editedProduct.price}
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
							value={editedProduct.description}
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
							value={editedProduct.offers}
							onChange={handleInputChange}
							required
						/>
					</li>
					<li className='p-3 flex items-center'>
						<label htmlFor='disable-checkbox' className='mr-4'>
							Deshabilitar el producto
						</label>
						<input
							id='disable-checkbox'
							type='checkbox'
							className='ml-2 form-checkbox h-5 w-5 text-green-500 focus:ring-green-400 focus:border-green-400'
							name='disable'
							checked={editedProduct.disable}
							onChange={e =>
								setEditedProduct({
									...editedProduct,
									disable: e.target.checked,
								})
							}
						/>
					</li>
				</ul>

				<button
					type='submit'
					className='bg-blue-500 text-2xl text-white hover:scale-105 transition-transform duration-500 ease-in-out flex mx-auto'
				>
					Guardar cambios
				</button>
			</form>
			<Toaster />
		</div>
	)
}

export default EditProduct
