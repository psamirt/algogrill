import { DocumentData, collection, getDocs } from 'firebase/firestore'
import { User } from 'utils/Types'
import { Dispatch } from 'redux'
import { db } from '../../utils/firebaseConfig'
import { getUser } from '../../features/user/userSlice'

export const fetchUsers = () => {
	return async (dispatch: Dispatch): Promise<void> => {
		try {
			const usersCollection = collection(db, 'users')
			const usersSnapshot = await getDocs(usersCollection)

			const usersData: User[] = []

			usersSnapshot.forEach(doc => {
				const userData = doc.data() as DocumentData
				const user: User = {
					id: doc.id,
					name: userData.displayName,
					email: userData.email,
					role: userData.role,
					photo: userData.photoURL,
				}
				usersData.push(user)
			})

			dispatch(getUser(usersData))
		} catch (error) {
			console.error('Error al obtener usuarios', error)
		}
	}
}
