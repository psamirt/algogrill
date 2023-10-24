export const validProductTypes = ['hamburguesa', 'salchipapa', 'alitas']

export type Product = {
	_id: string
	product_type: string
	product_name: string
	image: string
	price: number
	description: string
	offers: number
	disable: boolean
	rating: {
		stars: number[]
		totalStars: number
		comments: string[]
	}
}

export interface CartItem {
	product: Product;
	quantity: number;
	userId: string;
  }

export type Options =
	| 'dashboard'
	| 'users'
	| 'products'
	| 'sales'
	| 'payments'
	| 'SEO'
	| 'comments'
	| 'new-product'
	| 'edit-product'

export type User = {
	id: string
	name: string
	email: string
	role: string
	photo: string
}

export const orderOptions = [
	{ label: 'Ordenar', value: '' },
	{ label: 'Menor precio', value: 'price-asc' },
	{ label: 'Mayor precio', value: 'price-desc' },
	{ label: 'A a Z', value: 'name-asc' },
	{ label: 'Z a A', value: 'name-desc' },
]

