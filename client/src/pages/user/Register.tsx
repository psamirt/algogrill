import React, { useEffect, useState } from 'react'
import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Register: React.FC = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
		verifyPassword: '',
	})
	const { register } = useAuth()
	const navigate = useNavigate()
	const [error, setError] = useState('')
	const [passwordMatch, setPasswordMatch] = useState(true)
	const [disable, setDisable] = useState(true)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUser(prevUser => {
			const updatedUser = { ...prevUser, [name]: value }
			if (updatedUser.password === updatedUser.verifyPassword) {
				setPasswordMatch(true)
			} else {
				setPasswordMatch(false)
			}
			return updatedUser
		})
	}

	useEffect(() => {
		if (
			user.email === '' ||
			user.password === '' ||
			user.verifyPassword === '' ||
			!passwordMatch
		) {
			setDisable(true)
		} else {
			setDisable(false)
		}
	}, [user, passwordMatch])

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError('')
		try {
			await register(user.email, user.password)
			navigate('/')
		} catch (error: any) {
			setError(error.message)
		}
	}
	return (
		<>
			<div className='w-full flex items-center justify-center text-black mt-9'>
				<div className='w-[500px] min-h-[500px] bg-white relative rounded-lg p-5'>
					<h1 className='text-black text-3xl text-center border-b-2 pb-6'>
						Registro
					</h1>
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
								className={`border rounded-lg focus:ring-blue-400 
								 focus:border-gray-600 block w-full p-2.5 bg-gray-200 ${
										passwordMatch ? 'border-green-500' : 'border-red-500'
									}`}
							/>
						</div>
						<div className='relative mb-6'>
							<label
								htmlFor='password'
								className='block mb-2 text-sm font-medium'
							>
								Repetir contraseña
							</label>
							<input
								onChange={handleChange}
								type='password'
								id='verifyPassword'
								name='verifyPassword'
								placeholder='Ingrese nuevamente la contraseña'
								required
								className={`border rounded-lg focus:ring-blue-400 
								 focus:border-gray-600 block w-full p-2.5 bg-gray-200 ${
										passwordMatch ? 'border-green-500' : 'border-red-500'
									}`}
							/>
						</div>
						<hr />
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
							Registrarse
						</button>
						<div className='flex items-center justify-center mt-8'>
							<button>
								<BsFacebook size={40} className='text-blue-600  ' />
							</button>
							<button>
								<FcGoogle size={45} />
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default Register
