// import React from 'react'
import { carta } from '../utils/utils'
import Card from '../components/card/Card'

const Menu = (): JSX.Element => {

	return (
		<div className='relative flex items-center justify-center'>
			{carta.map((card)=>{
				return (
					<Card 
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

export default Menu
