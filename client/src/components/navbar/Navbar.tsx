import React, { useState } from 'react'
import {
	AiFillTag,
	AiOutlineClose,
	AiOutlineMenu,
	AiOutlineSearch,
} from 'react-icons/ai'
import { BiSolidUserCircle, BiSolidLogOutCircle } from 'react-icons/bi'
import { BsBagCheck } from 'react-icons/bs'
import { TbTruckDelivery } from 'react-icons/tb'
import { FaWallet } from 'react-icons/fa'
import { MdFavorite, MdHelp } from 'react-icons/md'
import { RiTodoFill } from 'react-icons/ri'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Login from '../../pages/admin/modal/Login'
import { useAppSelector } from '../../app/redux/hooks/customHooks'

const Navbar: React.FC = () => {
	const [openLogin, setOpenLogin] = useState(false)
	const [nav, setNav] = useState(false)
	const { user, logout } = useAuth()
	const itemsCount = useAppSelector(state => state.cart.items)

	const navigate = useNavigate()

	const totalQuantity = itemsCount.reduce((total, item) => total + item.quantity, 0);


	const handleModalOpen = () => {
		setOpenLogin(true)
	}
	const handleModalClose = () => {
		setOpenLogin(false)
	}

	const handleLogOut = async () => {
		await logout()
		navigate('/')
	}

	return (
		<div className='bg-yellow-400'>
			<div className='max-w-[1400px] mx-auto flex justify-between items-center p-4'>
				{/* left side */}

				<NavLink className='flex items-center' to='/'>
					<div
						onClick={() => setNav(!nav)}
						className='cursor-pointer md:hidden flex'
					>
						<AiOutlineMenu size={30} />
					</div>
					<img src='svg/logo-suplente.svg' alt='logo' className='w-[170px]' />
				</NavLink>

				{/* search input */}

				<div className='bg-slate-100 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]'>
					<AiOutlineSearch />
					<input
						className='bg-transparent p-2 focus:outline-none w-full'
						type='text'
						placeholder='Search burger'
					/>
				</div>

				{/* card and login button */}
				<div className='relative'>
					<button className='hidden md:flex items-center py-2'>
						<BsBagCheck size={25} className='mr-2' />
							<span className='bg-gray-700 text-slate-100 rounded-full w-[20px] h-[20px] bottom-[-3px] left-9 items-center justify-center flex absolute'>
								{totalQuantity}
							</span>
					</button>
				</div>
				<NavLink to='/menu' className='flex items-center justify-center ml-2'>
					<div className='flex items-center p-5 h-6 '>
						<p className=' text-lg'>Menú</p>
					</div>
				</NavLink>
				{user ? (
					<button
						onClick={handleLogOut}
						className='  hidden md:flex items-center py-2 '
					>
						<BiSolidLogOutCircle size={30} className='mr-2 p-0' />
						<span>Salir</span>
					</button>
				) : (
					<button
						onClick={handleModalOpen}
						className='hidden md:flex items-center py-2'
					>
						<BiSolidUserCircle size={30} className='' />
						<span>Ingresar</span>
					</button>
				)}
				{openLogin && <Login onClose={handleModalClose} />}

				{/* side drawer menu */}
				<div
					className={
						nav
							? 'fixed top-0 left-0 w-[300px] h-screen bg-black z-10 duration-300'
							: 'fixed top-0 left-[-100%] w-[300px] h-screen bg-black z-10 duration-300'
					}
				>
					<AiOutlineClose
						onClick={() => setNav(!nav)}
						size={30}
						className='absolute right-4 top-4 cursor-pointer'
					/>
					<NavLink to='/'>
						<h2 className='text-2xl p-4 m-2'>
							Algo <span className='font-bold'>Grill</span>
						</h2>
					</NavLink>
					<nav>
						<ul className='flex-col px-4 py-4-800'>
							<li className='text-xl py-4 flex'>
								{' '}
								<TbTruckDelivery size={25} className='mr-4' /> Pedidos{' '}
							</li>
							<li className='text-xl py-4 flex'>
								{' '}
								<MdFavorite size={25} className='mr-4' /> Favoritos{' '}
							</li>
							<li className='text-xl py-4 flex'>
								{' '}
								<FaWallet size={25} className='mr-4' /> Pagar{' '}
							</li>
							<li className='text-xl py-4 flex'>
								{' '}
								<MdHelp size={25} className='mr-4' /> Ayuda{' '}
							</li>
							<li className='text-xl py-4 flex'>
								{' '}
								<AiFillTag size={25} className='mr-4' /> Promociones{' '}
							</li>
							<NavLink to='/menu' className='text-xl py-4 flex'>
								{' '}
								<RiTodoFill size={25} className='mr-4' /> Carta{' '}
							</NavLink>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Navbar
