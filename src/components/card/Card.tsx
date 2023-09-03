// import React from 'react'

type CardProps = {
	nombre: string
	descripcion: string
	precio: number
  imagen: string
}

const Card: React.FC<CardProps> = (props) => {
	return (
		<div className='justify-center flex-wrap'>
			<div>
				<h2>{props.nombre}</h2>
				<p>{props.descripcion}</p>
				<h2>{props.precio}</h2>
			</div>
      <img src={props.imagen} alt="imagen" />
		</div>
	)
}

export default Card
