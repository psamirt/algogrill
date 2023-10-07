export const validProductTypes = ['hamburguesa', 'salchipapa', 'alitas']

export type Product = {
	product: [
		{
			product_type: string
			product_name: string
			image: string
			price: string
			description: string
			disable: boolean
			offers: number
			rating: [
				{
					stars: number[]
					totalStars: number
					comments: string[]
				},
			]
		},
	]
}

export type OptionsProduct=
'new-product'
'edit-product'

export type Options =
	| 'dashboard'
	| 'users'
	| 'products'
	| 'sales'
	| 'payments'
	| 'SEO'
	| 'comments'
