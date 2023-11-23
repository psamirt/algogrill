import axios from 'axios'
// const baseUrl = import.meta.env.VITE_BASE_URL
const localUrl = import.meta.env.VITE_LOCAL_URL

export const getPayed = async () => {
	try {
		const response = await axios.get(`${localUrl}/dashboard/getPayed`)
		return response.data
	} catch (error) {
		console.error('Error al obtener los pagos', error)
	}
}
