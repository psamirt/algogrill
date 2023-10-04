import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import ReCAPTCHA from 'react-google-recaptcha'

const ResetPassword: React.FC = () => {
	const { resetPassword } = useAuth()
	const [user, setUser] = useState({
		email: '',
	})
	const [error, setError] = useState('')
	const [disable, setDisable] = useState(true)

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!user.email) {
			setError('Ingresa tu email')
			return
		}

		try {
			await resetPassword(user.email)
			setError('Verifica tu bandeja de correo en el email ingresado')
		} catch (error) {
			setError(
				'Error al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.',
			)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<>
			<div className='w-full flex items-center justify-center text-black mt-9'>
				<div className='w-[500px] min-h-[500px] bg-white relative rounded-lg p-5'>
					<h1 className='text-black text-3xl text-center border-b-2 pb-6'>
						Restablecer contraseña
					</h1>
					<form onSubmit={handleResetPassword} className='pt-6 px-8 pb-8 mb-4'>
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
						<hr />
						<ReCAPTCHA
							sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
							onChange={() => setDisable(false)}
						/>
						<button
							type='submit'
							className={` text-black w-full ${
								disable
									? 'cursor-not-allowed opacity-50 bg-slate-400'
									: 'bg-blue-500 hover:scale-105 transition-transform duration-500 ease-in-out'
							}`}
							disabled={disable}
						>
							Enviar
						</button>
						{error && <p className='text-red-500 mt-2'>{error}</p>}
					</form>
				</div>
			</div>
		</>
	)
}

export default ResetPassword
