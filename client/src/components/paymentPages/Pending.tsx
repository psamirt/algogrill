import { useEffect } from 'react'

const Pending = () => {
	useEffect(() => {
		const redirectTimer = setTimeout(() => {
			window.location.href = 'http://localhost:5173/'
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
