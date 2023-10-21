import { useState } from 'react'
import { fetchProduct } from '../../../app/redux/actions/productActions'
import {
	useAppSelector,
	useAppDispatch,
} from '../../../app/redux/hooks/customHooks'
import { useEffect } from 'react'
import { Product } from '../../../utils/Types'

const Cart = () => {
	const dispatch = useAppDispatch()
	const cartState = useAppSelector(state => state.cart.items)
	console.log(cartState);
	
	const products = useAppSelector(state => state.product)
	const [cartProduct, setCartProduct] = useState<Product[]>([])
 

	useEffect(() => {
		dispatch(fetchProduct())
	}, [])

  const uniqueProductIds = [...new Set(cartState.map(product => product.productId))];
  const filteredProducts = products.filter(product => uniqueProductIds.includes(product._id));

  useEffect(()=>{
    setCartProduct(filteredProducts)
  },[])
  

	return (
		<div className='max-w-[1400px] mx-auto bg-slate-50 flex justify-between'>
			{/* cards */}
			<div className='w-[800px] m-7'>
				<table className='min-w-full border rounded-lg '>
					<thead className='bg-slate-200 border'>
						<tr className='text-left uppercase '>
							<th>Producto</th>
							<th>Cantidad</th>
							<th>Precio</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{cartProduct.map(el=>(

							<tr>
							<td>{el.product_name}</td>
							<td>asd</td>
							<td>{el.price}</td>
						</tr>
							))}
					</tbody>
				</table>
				<button>pagar</button>
			</div>
			{/* pagar */}
			<div className='w-[400px]'>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, maiores,
				ratione recusandae veniam earum asperiores magni sint praesentium
				doloremque consequuntur deleniti beatae porro! Corrupti esse vero,
				expedita sequi suscipit molestiae.
			</div>
		</div>
	)
}

export default Cart
