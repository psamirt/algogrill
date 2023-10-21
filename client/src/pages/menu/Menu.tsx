import { useEffect, useState } from 'react'
import { Product, orderOptions } from '../../utils/Types'
import { fetchProduct } from '../../app/redux/actions/productActions'
import Order from '../../components/filters&orders/Order'
import { BiCartAdd } from 'react-icons/bi'
import {
	useAppDispatch,
	useAppSelector,
} from '../../app/redux/hooks/customHooks'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { addProductsToCart } from '../../app/redux/actions/cartActions'


const Menu = () => {
	const products = useAppSelector((state): Product[] => state.product)
	const dispatch = useAppDispatch()
	const [selectedOrder, setSelectedOrder] = useState<string>('')
	const [selectTypes, setSelectTypes] = useState<string[]>([])
	const [selectQuantity, setSelectQuantity] = useState<Record<string, number>>(
		{},
	)
	const { user } = useAuth()

	useEffect(() => {
		dispatch(fetchProduct())
	}, [dispatch])
	

	const handleQuantityChange =
		(productId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
			const quantity = Number(event.target.value)
			setSelectQuantity(prevQuantities => ({
				...prevQuantities,
				[productId]: quantity,
			}))
		}

	const addToCart = (productId: string) => {
		try {
			if (user) {
				const quantity = selectQuantity[productId] || 1
				const userId = user.uid
				dispatch(addProductsToCart(productId, quantity, userId))
				toast.success('Añadido al carrito exitosamente', { duration: 3000 })
			} else {
				toast.error('Debe iniciar sesión para agregar items', {
					duration: 3000,
				})
			}
		} catch (error) {
			toast.error('Error al añadir al carrito', { duration: 3000 })
		}
	}

	const handleOrder = (value: string) => {
		setSelectedOrder(value)
	}

	const handleCheckboxChange = (type: string) => {
		if (selectTypes.includes(type)) {
			setSelectTypes(prevTypes => prevTypes.filter(t => t !== type))
		} else {
			setSelectTypes(prevTypes => [...prevTypes, type])
		}
	}

	const orderProducts = products.slice().sort((a, b) => {
		if (selectedOrder === '') {
			return 0 // Sin efecto
		}
		if (selectedOrder === 'price-asc') {
			return a.price - b.price // Ordenar por precio de menor a mayor
		}
		if (selectedOrder === 'price-desc') {
			return b.price - a.price // Ordenar por precio de mayor a menor
		}
		if (selectedOrder === 'name-asc') {
			return a.product_name.localeCompare(b.product_name) // Ordenar por nombre de A a Z
		}
		if (selectedOrder === 'name-desc') {
			return b.product_name.localeCompare(a.product_name) // Ordenar por nombre de Z a A
		}
		return 0
	})

	const filteredProducts = orderProducts.filter(product => {
		return (
			selectTypes.length === 0 || selectTypes.includes(product.product_type)
		)
	})

	return (
		<div className='max-w-[1400px] mx-auto bg-slate-50'>
			{/* Filtros */}
			<div className='bg-orange-300 p-3 rounded-b-md flex justify-evenly'>
				<Order onOrderChange={handleOrder} orderOptions={orderOptions} />
				<div className='flex items-center mb-2'>
					<input
						className='mr-2 h-5 w-5'
						name='hamburguesa'
						type='checkbox'
						checked={selectTypes.includes('hamburguesa')}
						onChange={() => handleCheckboxChange('hamburguesa')}
					/>
					<label id='hamburguesa' className='font-semibold'>
						Hamburguesas
					</label>
				</div>
				<div className='flex items-center mb-2'>
					<input
						className='mr-2 h-5 w-5'
						name='alitas'
						type='checkbox'
						checked={selectTypes.includes('alitas')}
						onChange={() => handleCheckboxChange('alitas')}
					/>
					<label id='alitas' className='font-semibold'>
						Alitas
					</label>
				</div>
				<div className='flex items-center mb-2'>
					<input
						className='mr-2 h-5 w-5'
						name='salchipapa'
						type='checkbox'
						checked={selectTypes.includes('salchipapa')}
						onChange={() => handleCheckboxChange('salchipapa')}
					/>
					<label id='salchipapa' className='font-semibold'>
						Salchipapas
					</label>
				</div>
			</div>
			{/* contenido */}
			<div className='grid grid-cols-2 lg:grid-cols-4 gap-6 p-4'>
				{filteredProducts.map(product => (
					<div key={product._id} className='border shadow-lg rounded-lg'>
						<img
							src={product.image}
							alt={product.product_name}
							className='w-full h-[200px] object-cover rounded-t-lg hover:scale-105 duration-300'
						/>
						<div className='flex justify-between px-2 py-4'>
							<p className='font-bold'>{product.product_name}</p>
							<div className='flex items-center bg-orange-500 px-2 rounded-md'>
								<input
									type='number'
									value={selectQuantity[product._id] || 1}
									onChange={handleQuantityChange(product._id)}
									className='mr-2 w-8 text-center rounded '
								/>
								<button
									className='flex  text-white px-2 rounded-full hover:scale-105 duration-300'
									onClick={() => addToCart(product._id)}
								>
									<span className='p-1'>
										s/.{' '}
										{product.price.toLocaleString(undefined, {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</span>
									<BiCartAdd />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<Toaster />
		</div>
	)
}

export default Menu
