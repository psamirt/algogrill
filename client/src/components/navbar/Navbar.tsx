import React, { useEffect, useState } from 'react'
import {
	AiFillTag,
	AiOutlineClose,
	AiOutlineMenu,
	AiOutlineDashboard,
} from 'react-icons/ai'
import { BiSolidUserCircle, BiSolidLogOutCircle } from 'react-icons/bi'
import { BsCart4 } from 'react-icons/bs'
import { FaWallet } from 'react-icons/fa'
import { MdHelp, MdMenuBook } from 'react-icons/md'
import { RiTodoFill } from 'react-icons/ri'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Login from '../../pages/user/loginRegister/Login'
import {
	useAppDispatch,
	useAppSelector,
} from '../../app/redux/hooks/customHooks'
import { cleanupCart, getCart } from '../../app/redux/actions/cartActions'
import { io } from 'socket.io-client/debug'
import { CartItem, User } from 'utils/Types'
import { fetchUsers } from '../../app/redux/actions/userAction'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
const socket = io('https://algo-grill.onrender.com')

const Navbar: React.FC = () => {
	const [openLogin, setOpenLogin] = useState(false)
	const [nav, setNav] = useState(false)
	const { user, logout } = useAuth()
	const [users, setUsers] = useState<User[]>([])
	const authenticatedUserUID = user?.uid
	const selectedUser = users.find(u => u.id === authenticatedUserUID)
	const cartState = useAppSelector(state => state.cart)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const totalQuantity = cartState.items.reduce(
		(total: number, item: CartItem) => total + (Number(item.quantity) || 1),
		0,
	)

	useEffect(() => {
		const getUsers = async () => {
			try {
				const data = await fetchUsers()
				setUsers(data)
			} catch (error) {
				console.error('Error al obtener el usuario:', error)
			}
		}
		getUsers()
	}, [])

	useEffect(() => {
		if (selectedUser) {
			const nameWords = selectedUser.name.split(' ')
			let welcomeMessage = `Bienvenido ${nameWords.slice(0, 2).join(' ')}`
			if (selectedUser.role === 'admin') {
				welcomeMessage = `Bienvenido ${selectedUser.role} ${nameWords
					.slice(0, 2)
					.join(' ')}`
			}
			toast.success(welcomeMessage)
		}
	}, [selectedUser])

	useEffect(() => {
		if (user && user.uid) {
			const userId = user.uid
			dispatch(getCart(userId))
			socket.on('cartUpdate', () => {
				dispatch(getCart(userId))
			})
		}
	}, [dispatch, user])

	const handleModalOpen = () => {
		setOpenLogin(true)
	}
	const handleModalClose = () => {
		setOpenLogin(false)
	}

	const handleLogOut = async () => {
		await logout()
		dispatch(cleanupCart())
		navigate('/')
		window.location.reload()
	}

	return (
		<div className='bg-yellow-400'>
			<div className='max-w-[1400px] mx-auto flex justify-between items-center p-4'>
				{/* left side */}
				<NavLink to='/' className='flex items-center'>
					<motion.div
						onClick={() => setNav(!nav)}
						className='cursor-pointer md:hidden flex'
						animate={{
							rotate: [0, 0, 270, 270, 0],
							borderRadius: ['20%', '20%', '50%', '50%', '20%'],
						}}
					>
						<AiOutlineMenu size={30} className='space-x-10' />
					</motion.div>
				</NavLink>
				<img
					src='svg/logo-suplente.svg'
					alt='logo'
					className='md:w-[170px] w-[100px] md:m-auto'
				/>

				{/* card and login button */}
				{selectedUser?.role === 'admin' && (
					<div className='hidden md:flex items-center'>
						<NavLink to='/admin' className='m-auto'>
							<AiOutlineDashboard size={30} className='m-auto' />
							<span>Admin</span>
						</NavLink>
					</div>
				)}
				<div className='hidden md:flex items-center'>
					<div>
						<NavLink to={`/cart/${user?.uid}`}>
							<BsCart4 size={25} className='m-auto' />
						</NavLink>
						<span>Cart</span>
					</div>
					<span className='bg-gray-700 text-slate-100 rounded-full w-[20px] h-[20px] items-center justify-center flex'>
						{totalQuantity}
					</span>
				</div>
				<div className='hidden md:flex items-center'>
					<NavLink to='/menu'>
						<MdMenuBook size={25} className='m-auto' />
						<span>Menú</span>
					</NavLink>
				</div>
				{user ? (
					<div className='hidden md:flex items-center'>
						<button onClick={handleLogOut}>
							<BiSolidLogOutCircle size={30} className='m-auto' />
							<span>Salir</span>
						</button>
					</div>
				) : (
					<div className='hidden md:flex items-center'>
						<button onClick={handleModalOpen}>
							<BiSolidUserCircle size={30} className='m-auto' />
							<span>Ingresar</span>
						</button>
					</div>
				)}
				{openLogin && <Login onClose={handleModalClose} />}

				{/* side drawer menu */}
				<div
					className={
						nav
							? 'fixed top-0 left-0 w-[300px] h-screen bg-black z-20 duration-300'
							: 'fixed top-0 left-[-100%] w-[300px] h-screen bg-black z-20 duration-300'
					}
				>
					<AiOutlineClose
						onClick={() => setNav(!nav)}
						size={30}
						className='absolute right-4 top-4 cursor-pointer text-white'
					/>
					<NavLink to='/' className='text-white'>
						<h2 className='text-2xl p-4 m-2'>
							Algo <span className='font-bold'>Grill</span>
						</h2>
					</NavLink>
					<nav>
						<ul className='flex-col px-4 py-4-800 text-white'>
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
								<RiTodoFill size={25} className='mr-4' /> Menu{' '}
							</NavLink>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Navbar
