import React, { useState, useEffect } from 'react'
import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineClose } from 'react-icons/ai'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

type LoginProps = {
	onClose: () => void
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const { login, loginWithGoogle } = useAuth()
	const navigate = useNavigate()
	const [error, setError] = useState('')
	const [disable, setDisable] = useState(true)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUser(prevUser => {
			const updatedUser = { ...prevUser, [name]: value }
			return updatedUser
		})
	}

	useEffect(() => {
		if (user.email === '' || user.password === '') {
			setDisable(true)
		} else {
			setDisable(false)
		}
	}, [user])

	const handleLoginWithGoogle = async () => {
		try {
			await loginWithGoogle()
			onClose()
		} catch (error: any) {
			setError(error.message)
		}
	}

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError('')
		try {
			await login(user.email, user.password)
			onClose()
			navigate('/')
		} catch (error: any) {
			setError(error.message)
		}
	}
	return (
		<>
			<div className='bg-black/80 fixed w-full h-screen z-10 top-0 flex items-center justify-center text-black'>
				<div className='w-[500px] min-h-[500px] bg-white relative rounded-lg p-5'>
					<h1 className='text-black text-3xl text-center pb-6'>
						Iniciar sesión
					</h1>
					<button onClick={onClose} className='absolute top-1 right-0'>
						<AiOutlineClose size={30} />
					</button>
					{error && <p>{error}</p>}
					<form
						onSubmit={handleSubmit}
						action=''
						className='pt-6 px-8 pb-8 mb-4'
					>
						<div className='relative mb-6'>
							<label htmlFor='email' className='block mb-2 text-sm font-medium'>
								Email
							</label>
							<input
								onChange={handleChange}
								type='email'
								id='email'
								name='email'
								placeholder='Ingrese correo'
								required
								className='border rounded-lg focus:ring-blue-400 
                            focus:border-gray-600 block w-full p-2.5 bg-gray-200'
							/>
						</div>
						<div className='relative mb-6'>
							<label
								htmlFor='password'
								className='block mb-2 text-sm font-medium'
							>
								contraseña
							</label>
							<input
								onChange={handleChange}
								type='password'
								id='password'
								name='password'
								placeholder='*********'
								required
								className='border rounded-lg focus:ring-blue-400 
                            focus:border-gray-600 block w-full p-2.5 bg-gray-200'
							/>
						</div>
						<hr />
						<div className='text-center justify-between flex'>
							<a className='text-sm' href='/resetPassword'>
								¿Olvidó su contraseña?
							</a>
							<a className='text-sm' href='/register'>
								Quiero registrarme
							</a>
						</div>
						<br />
						<button
							type='submit'
							className={`${
								disable
									? 'bg-slate-300 w-full text-white'
									: 'bg-blue-500 text-black w-full hover:scale-105 transition-transform duration-500 ease-in-out'
							}`}
							disabled={disable}
						>
							Iniciar
						</button>
						<div className='flex items-center justify-center mt-8'>
							<button>
								<BsFacebook size={40} className='text-blue-600  ' />
							</button>
							<button onClick={handleLoginWithGoogle}>
								<FcGoogle size={45} />
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default Login
