// import React from 'react'
import { carta } from '../../../utils/utils'
import Card from '../../../components/card/Card'

const Burger = (): JSX.Element => {

	return (
		<div className='max-w-[1640px] mx-auto flex flex-col justify-between items-center p-4'>
			<h1 className='text-6xl underline'>Burger</h1>
			{carta.map((card)=>{
				return (
					<Card 
					id={card.id}
					nombre={card.nombre}
					descripcion={card.descripcion}
					precio={card.precio}
					imagen={card.imagen}
					/>
				)
			})}
		</div>
	)
}

export default Burger
