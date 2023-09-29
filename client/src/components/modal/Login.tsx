import React, { useState } from 'react'
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError('')
		try {
			if (user.password === user.verifyPassword) {
				await register(user.email, user.password)
				navigate('/')
			} else {
				setError('Contraseñas no coinciden')
			}
		} catch (error: any) {
			setError(error.message)
		}
	}
	return (
		<>
			<div className='bg-black/80 fixed w-full h-screen z-10 top-0 flex items-center justify-center text-black'>
				<div className='w-[500px] min-h-[500px] bg-white relative rounded-lg p-5'>
					<h1 className='text-black text-3xl text-center border-b-2 pb-6'>
						Iniciar sesión
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
								className='border rounded-lg focus:ring-blue-400 
                            focus:border-gray-600 block w-full p-2.5 bg-gray-200'
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
								className='border rounded-lg focus:ring-blue-400 
                            focus:border-gray-600 block w-full p-2.5 bg-gray-200'
							/>
						</div>
						<hr />
						<div className='text-center justify-between flex'>
							<a className='text-sm' href='#'>
								¿Olvidó su contraseña?
							</a>
							<a className='text-sm' href='#'>
								Registro
							</a>
						</div>
						<br />
						<button type='submit' className='bg-slate-400 w-full'>
							Iniciar
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
