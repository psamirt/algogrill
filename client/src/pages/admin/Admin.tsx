import {
	RiDashboardLine,
	RiUserStarLine,
	RiMoneyDollarCircleLine,
	RiSeoLine,
} from 'react-icons/ri'
import { BiFoodMenu } from 'react-icons/bi'
import { CiDeliveryTruck } from 'react-icons/ci'
import { FaComments } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const admin = (): JSX.Element => {
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
									admin
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
							<li>
								<Link
									to={'/newProduct'}
									className='flex items-center gap-3 hover:bg-slate-400 p-4 rounded-lg transition-colors font-semibold'
								>
									<BiFoodMenu size={30} />
									Productos
								</Link>
							</li>
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
			<div className='bg-slate-600 col-span-5'>hello</div>
		</div>
	)
}

export default admin
