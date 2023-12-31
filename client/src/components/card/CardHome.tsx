import { NavLink } from 'react-router-dom'

const CardHome = () => {
	return (
		<div className='mx-4 py-12 grid md:grid-cols-3 gap-6'>
			{/* Card */}
			<div className='rounded-xl relative'>
				{/* Overlay */}
				<div className='absolute h-full w-full bg-black/50 rounded-xl text-white'>
					<p className='font-bold text-2xl px-2 pt-4'>Hamburguesas</p>
					<p className='px-2'>Artesanales</p>
					<p className='font-bold text-2xl px-2 pt-4'>Alitas</p>
					<p className='font-bold text-2xl px-2 pt-4'>Salchipapas</p>
					<NavLink
						to='/menu'
						className='border-white bg-white text-black mx-2 absolute bottom-4 rounded p-1'
					>
						Ver todas
					</NavLink>
				</div>
				<img
					src='imagenes/hamburguesa-card.jpg'
					alt='card-image'
					className=' h-[250px] w-full object-cover rounded-xl'
				/>
			</div>
			{/* Card */}
			<div className='rounded-xl relative'>
				{/* Overlay */}
				<div className='absolute h-full w-full bg-black/50 rounded-xl text-white'>
					<p className='font-bold text-2xl px-2 pt-4'>Promociones</p>
					<NavLink
						to='/#'
						className='border-white bg-white text-black mx-2 absolute bottom-4 rounded p-1'
					>
						Ver todas
					</NavLink>
				</div>
				<img
					src='imagenes/alitas.jpg'
					alt='card-image'
					className=' h-[250px] w-full object-cover rounded-xl'
				/>
			</div>
			{/* Card */}
			<div className='rounded-xl relative'>
				{/* Overlay */}
				<div className='absolute h-full w-full bg-black/50 rounded-xl text-white'>
					<p className='font-bold text-2xl px-2 pt-4'>Zona de reparto</p>
					<NavLink
						to='/#'
						className='border-white bg-white text-black mx-2 absolute bottom-4 rounded p-1'
					>
						Ver todas
					</NavLink>
				</div>
				<img
					src='imagenes/salchi.jpeg'
					alt='card-image'
					className=' h-[250px] w-full object-cover rounded-xl'
				/>
			</div>
		</div>
	)
}

export default CardHome
