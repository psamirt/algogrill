export type Hamburguesa = {
    id:number
    descripcion: string
    precio: number
    imagen: string
    nombre: string
}
export const carta: Hamburguesa[] = [
    {
        id:1,
        descripcion: 'Hamburguesa artesanal de 130 gr. a la parrilla, con salsa casera, queso cheddar y nuestras crujientes papas fritas.',
        precio: 12.5,
        imagen: '/imagenes/hamburguesa.png',
        nombre: 'Base Grill',
    },
    {
        id:2,
        descripcion:
            'Hamburguesa artesanal de 130 gr. a la parrilla, con salsa casera, queso cheddar, piña con canela, jamón y nuestras crujientes papas fritas.',
        precio: 15.5,
        imagen: '/imagenes/hamburguesa.png',
        nombre: 'Glucosa',
    },
    {
        id:3,
        descripcion:
            'Hamburguesa artesanal de 130 gr. a la parrilla, con salsa casera, queso cheddar, chorizo parrillero, plátano, huevo y acompañado de nuestras crujientes papas fritas.',
        precio: 23.5,
        imagen: '/imagenes/hamburguesa.png',
        nombre: 'Taquicardia',
    },
    {
        id:4,
        descripcion:
            'Hamburguesa artesanal de 130 gr. a la parrilla, con salsa casera, queso cheddar, chorizo parrillero, tocino y frankfurt encima de nuestras crujientes papas fritas.',
        precio: 23.0,
        imagen: '/imagenes/hamburguesa.png',
        nombre: 'Tapartereas',
    },
]