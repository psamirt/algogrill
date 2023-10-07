import {
	RiDashboardLine,
	RiUserStarLine,
	RiMoneyDollarCircleLine,
	RiSeoLine,
} from 'react-icons/ri'
import { BiFoodMenu } from 'react-icons/bi'
import { CiDeliveryTruck } from 'react-icons/ci'
import { FaComments } from 'react-icons/fa'
import { useState } from 'react'
import CreateProduct from './products/CreateProduct'
// import { Options } from '../../utils/Types.ts'
import { OptionsProduct } from '../../utils/Types.ts'
import EditProduct from './products/EditProduct.tsx'

const Admin = (): JSX.Element => {
	// const [selectedOption, setSelectedOption] = useState<Options | string>()
	const [optionsProduct, setOptionProduct] = useState<OptionsProduct | string>()
	const [menuOpen, setMenuOpen] = useState(false)

	let content = null

	const handleOptionSelect = (selectedOption: OptionsProduct | string) => {
		setOptionProduct(selectedOption)
		setMenuOpen(false)
	}

	if (optionsProduct === 'new-product') {
		content = <CreateProduct />
	} else if (optionsProduct === 'edit-product') {
		content = <EditProduct />
	}

	return (
		<div className='min-h-screen grid grid-cols-6'>
			<div className='col-span-1 p-8'>
				{/* logo */}
				<div className='text-center p-8'>
					<h1 className=' uppercase font-bold tracking-[4px]'>Resumen</h1>
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
								<a
									href='#'
									className='flex items-center gap-3 hover:bg-slate-400 p-4 rounded-lg transition-colors font-semibold'
								>
									<RiUserStarLine size={30} />
									Usuarios
								</a>
							</li>

							<div className='flex items-center '>
								<li
									onClick={() => setMenuOpen(!menuOpen)}
									className='flex items-center gap-3 hover:bg-slate-400 p-4 rounded-lg transition-colors font-semibold'
								>
									<BiFoodMenu size={30} />
									Productos
								</li>

								{menuOpen ? (
									<select
										onChange={e => handleOptionSelect(e.target.value)}
										value={optionsProduct}
										className='bg-slate-400 rounded m-1 relative '
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
									</select>
								) : (
									''
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
					<img
						src='imagenes/imgAdmin.svg'
						alt='admin'
						className='max-w-[200px]'
					/>
				</div>
			</div>
			<div className='col-span-5'>{content}</div>
		</div>
	)
}

export default Admin
