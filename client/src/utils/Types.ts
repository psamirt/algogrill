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

export type OptionsProduct = 'new-product' | 'edit-product'

export type Options =
	| 'dashboard'
	| 'users'
	| 'products'
	| 'sales'
	| 'payments'
	| 'SEO'
	| 'comments'

export type User = { id: string; name: string; email: string; role: string ; photo:string}
