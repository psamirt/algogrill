import axios from 'axios'
import { ApiSaleData, Bar, ChartDataItem, Producto } from 'utils/Types'
const baseUrl = import.meta.env.VITE_BASE_URL
// const localUrl = import.meta.env.VITE_LOCAL_URL

export const getPayed = async () => {
	try {
		const response = await axios.get(`${baseUrl}/dashboard/getPayed`)
		// const response = await axios.get(`${localUrl}/dashboard/getPayed`)
		return response.data
	} catch (error) {
		console.error('Error al obtener los pagos', error)
	}
}

export const getTopProducts = async (): Promise<Bar[]> => {
	try {
		const response = await axios.get(
			`${baseUrl}/dashboard/getTopSellingProducts`,
			// `${localUrl}/dashboard/getTopSellingProducts`,
		)
		const apiData = response.data

		const topSellingProducts: Producto[] = apiData.topSellingProducts

		const transformedData = topSellingProducts.map(product => ({
			key: product._id,
			value: product.totalSold,
			name: product.productName,
		}))

		return transformedData
	} catch (error) {
		console.error('Error al obtener los productos', error)
		throw error
	}
}

export const getSalesByDay = async (): Promise<ChartDataItem[]> => {
	try {
		const response = await axios.get(`${baseUrl}/dashboard/getSalesByDay`)
		// const response = await axios.get(`${localUrl}/dashboard/getSalesByDay`)
		const apiData: ApiSaleData[] = response.data.salesByDay

		const transformedData = apiData.map(item => ({
			name: `${item._id.month}/${item._id.day}`,
			'Ranking por día': item.totalSales,
		}))

		return transformedData
	} catch (error) {
		console.error('Error al obtener las ventas por día', error)
		throw error
	}
}
