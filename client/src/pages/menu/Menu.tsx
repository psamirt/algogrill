import { useEffect, useState } from 'react'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'app/store'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from 'utils/Types'
import { fetchProduct } from '../../app/actions/productActions'
import Order from '../../components/filters&orders/Order'

const Menu = () => {
	const orderOptions = [
		{ label: "Ordenar", value: "" },
		{ label: "Menor precio", value: "price-asc" },
		{ label: "Mayor precio", value: "price-desc" },
		{ label: "A a Z", value: "name-asc" },
		{ label: "Z a A", value: "name-desc" },
	  ];
	
	const products = useSelector((state: RootState): Product[] => state.product)
	const dispatch: ThunkDispatch<RootState, unknown, AnyAction> =
		useDispatch<AppDispatch>()
	const [selectedOrder, setSelectedOrder] = useState<string>('')

	useEffect(() => {
		dispatch(fetchProduct())
	}, [dispatch])

	const handleOrder = (value:string) => {
		setSelectedOrder(value)
	}

	const orderProducts = products.slice().sort((a, b) => {
		if (selectedOrder === "") {
			return 0; // Ordenar por precio de menor a mayor
		  }
		if (selectedOrder === "price-asc") {
		  return a.price - b.price; // Ordenar por precio de menor a mayor
		}
		if (selectedOrder === "price-desc") {
		  return b.price - a.price; // Ordenar por precio de mayor a menor
		}
		if (selectedOrder === "name-asc") {
		  return a.product_name.localeCompare(b.product_name); // Ordenar por nombre de A a Z
		}
		if (selectedOrder === "name-desc") {
		  return b.product_name.localeCompare(a.product_name); // Ordenar por nombre de Z a A
		}
		return 0;
	  });

	return (
		<div className='max-w-[1400px] mx-auto'>
			{/* Filtros */}
			<div className='bg-orange-300 p-3 rounded-b-md'>
			<Order onOrderChange={handleOrder} orderOptions={orderOptions} />
			</div>
			{/* contenido */}
			<div className='grid grid-cols-2 lg:grid-cols-4 gap-6 p-4'>
				{orderProducts.map(product => (
					<div key={product._id} className='border shadow-lg rounded-lg'>
						<img
							src={product.image}
							alt={product.product_name}
							className='w-full h-[200px] object-cover rounded-t-lg hover:scale-105 duration-300'
						/>
						<div className='flex justify-between px-2 py-4 '>
							<p className='font-bold'>{product.product_name}</p>
							<p>
								<span className='bg-orange-500 text-white px-2 rounded-full'>
									./S {product.price}
								</span>
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Menu
