import {
	RiUserStarLine,
	RiMoneyDollarCircleLine,
	RiSeoLine,
} from 'react-icons/ri'
import { BiFoodMenu } from 'react-icons/bi'
import React, { useState } from 'react'
import CreateProduct from './products/CreateProduct'
import { Options } from '../../utils/Types.ts'
import { motion } from 'framer-motion'
import ProductList from './products/ProductList.tsx'
import AllProducts from './products/AllProducts.tsx'
import Dashboard from './dashboard/Dashboard.tsx'
import Users from './users/Users.tsx'

const Admin = (): JSX.Element => {
	const [selectedOption, setSelectedOption] = useState<Options | string>('')
	const [menuOpen, setMenuOpen] = useState(false)

	let content = <Dashboard />

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
	} else if (selectedOption === 'users') {
		content = <Users />
	}

	return (
		<div className='max-h-[100vh] max-w-[1400px] mx-auto grid grid-cols-6'>
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.8,
					delay: 0.5,
					ease: [0, 0.71, 0.2, 1.01],
				}}
				className='col-span-1 p-8'
			>
				{/* logo */}
				<div className='text-center p-8'>
					<button
						onClick={handleClick}
						value='resumen'
						name='resumen'
						className=' uppercase font-bold tracking-[4px]'
					>
						Dashboard
					</button>
				</div>
				<div className='h-[700px] flex flex-col justify-between '>
					{/* Menu */}
					<nav>
						<ul>
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
						</ul>
					</nav>
					{/* imagen */}
					<img src='svg/imgAdmin.svg' alt='admin' className='max-w-[200px]' />
				</div>
			</motion.div>
			<div className='col-span-5'>{content}</div>
		</div>
	)
}

export default Admin
