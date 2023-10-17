import { DocumentData, collection, getDocs } from 'firebase/firestore'
import { User } from 'utils/Types'
import { db } from '../../../utils/firebaseConfig'

export const fetchUsers = async (): Promise<User[]> => {
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

	return usersData
}
