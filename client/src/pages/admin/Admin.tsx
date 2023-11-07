import {
	RiDashboardLine,
	RiUserStarLine,
	RiMoneyDollarCircleLine,
	RiSeoLine,
} from 'react-icons/ri'
import { BiFoodMenu } from 'react-icons/bi'
import { CiDeliveryTruck } from 'react-icons/ci'
import { FaComments } from 'react-icons/fa'
import React, { useState } from 'react'
import CreateProduct from './products/CreateProduct'
import { Options } from '../../utils/Types.ts'
import ProductList from './products/ProductList.tsx'
import AllProducts from './products/AllProducts.tsx'
import Users from './users/Users.tsx'
import Resumen from './resumen/Resumen.tsx'


const Admin = (): JSX.Element => {
	const [selectedOption, setSelectedOption] = useState<Options | string>('')
	const [menuOpen, setMenuOpen] = useState(false)

	let content = <Resumen />

	const handleClick = (
		event:
			| React.MouseEvent<HTMLButtonElement>
			| React.ChangeEvent<HTMLSelectElement>,
	) => {
		const value = event.currentTarget
			? (event.currentTarget as HTMLButtonElement).value
			: (event.target as HTMLSelectElement).value
		setSelectedOption(value as Options)
	}

	if (selectedOption === 'new-product') {
		content = <CreateProduct />
	} else if (selectedOption === 'edit-product') {
		content = <ProductList />
	} else if (selectedOption === 'all-products') {
		content = <AllProducts />
	} else if (selectedOption === 'resumen') {
		content = <Resumen />
	} else if (selectedOption === 'users') {
		content = <Users />
	}

	return (
		<div className='max-h-[100vh] max-w-[1400px] mx-auto grid grid-cols-6'>
			<div className='col-span-1 p-8'>
				{/* logo */}
				<div className='text-center p-8'>
					<button
						onClick={handleClick}
						value='resumen'
						name='resumen'
						className=' uppercase font-bold tracking-[4px]'
					>
						Resumen
					</button>
				</div>
				<div className='h-[700px] flex flex-col justify-between '>
					{/* Menu */}
					<nav>
						<ul>
							<li>
								<a
									href='#'
									className='flex items-center gap-3 hover:bg-slate-400 lg:text-sm p-4 rounded-lg transition-colors font-semibold'
								>
									<RiDashboardLine size={30} />
									dashboard
								</a>
							</li>
							<li>
								<button
									onClick={handleClick}
									value='users'
									name='users'
									className='flex items-center gap-3 hover:bg-slate-400 p-4 rounded-lg transition-colors font-semibold'
								>
									<RiUserStarLine size={30} />
									Usuarios
								</button>
							</li>

							<div className='flex items-center '>
								<li
									onClick={() => setMenuOpen(!menuOpen)}
									className='flex items-center gap-3 cursor-pointer hover:bg-slate-400 p-4 rounded-lg transition-colors font-semibold'
								>
									<BiFoodMenu size={30} />
									Productos
								</li>

								{menuOpen && (
									<select
										onChange={e => handleClick(e)}
										value={selectedOption}
										className='bg-slate-200 rounded m-1 relative cursor-pointer'
									>
										<option value='' className='text-black'>
											Seleccionar opción
										</option>
										<option value='new-product' className='text-black'>
											Nuevo producto
										</option>
										<option value='edit-product' className='text-black'>
											Editar producto
										</option>
										<option value='all-products' className='text-black'>
											Listado de productos
										</option>
									</select>
								)}
							</div>

							<li>
								<a
									href='#'
									className='flex items-center gap-3 hover:bg-slate-400 p-4 rounded-lg transition-colors font-semibold'
								>
									<CiDeliveryTruck size={30} />
									Pedidos y Ventas
								</a>
							</li>
							<li>
								<a
									href='#'
									className='flex items-center gap-3 hover:bg-slate-400 p-4 rounded-lg transition-colors font-semibold'
								>
									<RiMoneyDollarCircleLine size={30} />
									Pagos
								</a>
							</li>
							<li>
								<a
									href='#'
									className='flex items-center gap-3 hover:bg-slate-400 p-4 rounded-lg transition-colors font-semibold'
								>
									<RiSeoLine size={30} />
									SEO
								</a>
							</li>
							<li>
								<a
									href='#'
									className='flex items-center gap-3 hover:bg-slate-400 p-4 rounded-lg transition-colors font-semibold'
								>
									<FaComments size={30} />
									Comentarios
								</a>
							</li>
						</ul>
					</nav>
					{/* imagen */}
					<img src='svg/imgAdmin.svg' alt='admin' className='max-w-[200px]' />
				</div>
			</div>
			<div className='col-span-5'>{content}</div>
		</div>
	)
}

export default Admin
