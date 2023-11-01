import { useEffect, useState } from 'react'
import { Product, orderOptions } from '../../utils/Types'
import { fetchProduct } from '../../app/redux/actions/productActions'
import Order from '../../components/filters&orders/Order'
import { BiCartAdd } from 'react-icons/bi'
import {
	useAppDispatch,
	useAppSelector,
} from '../../app/redux/hooks/customHooks'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { addProductsToCart } from '../../app/redux/actions/cartActions'
import { motion, AnimatePresence } from 'framer-motion'
import ProductDetail from '../../components/productDetail/ProductDetail'

const Menu = () => {
	const products = useAppSelector((state): Product[] => state.product)
	const dispatch = useAppDispatch()
	const [selectedOrder, setSelectedOrder] = useState<string>('')
	const [selectTypes, setSelectTypes] = useState<string[]>([])
	const [selectedProduct, setSelectedProduct] = useState<Product['_id']>('')
	const [isDetailVisible, setIsDetailVisible] = useState(false)
	const [selectQuantity, setSelectQuantity] = useState<Record<string, number>>(
		{},
	)
	const { user } = useAuth()

	useEffect(() => {
		dispatch(fetchProduct())
	}, [dispatch])

	const showProductDetail = (product: Product['_id']) => {
		setSelectedProduct(product)
		setIsDetailVisible(true)
	}

	const hideProductDetail = () => {
		setSelectedProduct('')
		setIsDetailVisible(false)
	}

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
			const selectedProduct = products.find(p => p._id === productId)
			if (user && selectedProduct) {
				const quantity = selectQuantity[productId] || 1
				const userId = user.uid
				dispatch(addProductsToCart(selectedProduct, quantity, userId))
				toast.success('Añadido al carrito exitosamente', { duration: 3000 })
			} else {
				toast.error(
					'Producto no válido o debe iniciar sesión para agregar ítems',
					{
						duration: 3000,
					},
				)
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
		<div className='max-w-[1400px] mx-auto bg-slate-50 relative'>
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
				{filteredProducts.map((product, i) => (
					<motion.div
						key={product._id}
						className='border shadow-lg rounded-lg'
						initial={{
							opacity: 0,
							translateX: i % 2 === 0 ? -50 : 50,
							translateY: -50,
						}}
						animate={{ opacity: 1, translateX: 0, translateY: 0 }}
						transition={{ duration: 0.5, delay: i * 0.1 }}
					>
						<motion.div
							layoutId={product._id}
							onClick={() => showProductDetail(product._id)}
						>
							<img
								src={product.image}
								alt={product.product_name}
								className='w-full h-[200px] opacity-95 object-cover rounded-t-lg hover:opacity-100 hover:scale-105 duration-300 cursor-pointer'
							/>
						</motion.div>

						<div className='flex justify-between px-2 py-4'>
							<div className='flex-col '>
								<p className='font-bold'>{product.product_name}</p>
								<span className='p-1 font-semibold text-red-600'>
									s/.{' '}
									{product.price.toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</span>
							</div>
							<div className='flex items-center px-2 rounded-md'>
								<input
									type='number'
									value={selectQuantity[product._id] || 1}
									onChange={handleQuantityChange(product._id)}
									className='mr-1 w-9 text-center rounded bg-orange-100 border-solid  font-bold'
								/>
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									className='flex text-red-600 px-1 rounded-full '
									onClick={() => addToCart(product._id)}
								>
									<BiCartAdd size={30} />
								</motion.button>
							</div>
						</div>
					</motion.div>
				))}
				<AnimatePresence>
					{isDetailVisible && (
						<motion.div
							layoutId={selectedProduct}
							className='bg-black/80 fixed w-full h-screen z-10 top-0 right-0 flex items-center justify-center'
						>
							<ProductDetail
								productId={selectedProduct}
								onClose={hideProductDetail}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default Menu
