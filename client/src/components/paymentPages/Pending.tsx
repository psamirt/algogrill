import { useEffect } from 'react'
const baseUrl = import.meta.env.VITE_BASE_URL
// const localUrl = import.meta.env.VITE_LOCAL_URL_FRONT

const Pending = () => {
	useEffect(() => {
		const redirectTimer = setTimeout(() => {
			window.location.href = 
			`${baseUrl}`
			// `${localUrl}`
		}, 5000)
		return () => clearTimeout(redirectTimer)
	}, [])
	return (
		<div className='max-w-[1400px] mx-auto flex'>
			<h1 className='font-bold justify-center items-center flex w-full h-[700px] text-4xl'>
				Pago pendiente, actualmente no podemos enviar su producto.
			</h1>
		</div>
	)
}

export default Pending
