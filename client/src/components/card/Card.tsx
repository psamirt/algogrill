const Card = () => {
	return (
		<div className='mx-4 py-12 grid md:grid-cols-3 gap-6'>
			{/* Card */}
			<div className='rounded-xl relative'>
				{/* Overlay */}
				<div className='absolute h-full w-full bg-black/50 rounded-xl text-white'>
					<p className='font-bold text-2xl px-2 pt-4'>Hamburguesas</p>
					<p className='px-2'>Artesanales</p>
					<button className='border-white bg-white text-black mx-2 absolute bottom-4'>
						Ver todas
					</button>
				</div>
				<img
					src='imagenes/hamburguesa-card.jpg'
					alt='card-image'
					className=' h-[250px] w-full object-cover'
				/>
			</div>
			{/* Card */}
			<div className='rounded-xl relative'>
				{/* Overlay */}
				<div className='absolute h-full w-full bg-black/50 rounded-xl text-white'>
					<p className='font-bold text-2xl px-2 pt-4'>Alitas</p>
					<button className='border-white bg-white text-black mx-2 absolute bottom-4'>
						Ver todas
					</button>
				</div>
				<img
					src='imagenes/alitas.jpg'
					alt='card-image'
					className=' h-[250px] w-full object-cover'
				/>
			</div>
			{/* Card */}
			<div className='rounded-xl relative'>
				{/* Overlay */}
				<div className='absolute h-full w-full bg-black/50 rounded-xl text-white'>
					<p className='font-bold text-2xl px-2 pt-4'>Salchipapas</p>
					<button className='border-white bg-white text-black mx-2 absolute bottom-4'>
						Ver todas
					</button>
				</div>
				<img
					src='imagenes/salchi.jpeg'
					alt='card-image'
					className=' h-[250px] w-full object-cover'
				/>
			</div>
		</div>
	)
}

export default Card
