// import React from 'react'

type CardProps = {
	nombre: string
	descripcion: string
	precio: number
	imagen: string
}

const Card: React.FC<CardProps> = props => {
	return (
		<div className='w-[900px] h-[200px] flex m-8 items-center justify-between bg-zinc-900 p-5 rounded shadow-lg'>
			<img src={props.imagen} alt='imagen' className='w-32 h-auto' />
			<div className='w-[450px] h-[180px] m-auto'>
				<div className='flex justify-between mb-9'>
					<h2 className='text-xl font-bold'>{props.nombre}</h2>
					<h2 className='text-xl font-bold'>.S/ {props.precio.toFixed(2)}</h2>
				</div>
				<p className='text-base italic'>{props.descripcion}</p>
			</div>
			<button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out'>
				Agregar al carrito
			</button>
		</div>
	)
}

export default Card
