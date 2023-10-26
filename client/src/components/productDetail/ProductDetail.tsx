import { Product } from '../../utils/Types'
import { useAppSelector } from '../../app/redux/hooks/customHooks'
import { motion } from 'framer-motion'
import { AiOutlineClose } from 'react-icons/ai'

interface PropsProduct {
	productId: string
	onClose: () => void
}

const ProductDetail: React.FC<PropsProduct> = ({ productId, onClose }) => {
	const products = useAppSelector((state): Product[] => state.product)

	const selectedProduct = products.find(product => product._id === productId)

	if (!selectedProduct) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<div className='product-not-found'>
					Producto no encontrado.
					<button onClick={onClose}>Cerrar</button>
				</div>
			</motion.div>
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className='w-[800px] min-h-[800px] bg-slate-100 relative rounded-lg px-5 items-center justify-center'>
				<div className='items-center flex justify-center '>
					<p className='text-[60px] font-bold underline decoration-4 p-2'>
						{selectedProduct?.product_name}
					</p>
				</div>
				<img
					src={selectedProduct?.image}
					alt={selectedProduct?.product_name}
					className='w-[500px] h-[500px] object-cover mx-auto rounded-xl'
				/>
				<p className='text-[30px] p-2 italic font-semibold '>
					* {selectedProduct?.description}
				</p>
				<button onClick={onClose} className='absolute top-1 right-0'>
					<AiOutlineClose size={30} />
				</button>
			</div>
		</motion.div>
	)
}

export default ProductDetail
