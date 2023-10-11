import { useEffect, useState } from 'react'
import { DocumentData, collection, getDocs } from 'firebase/firestore'
import { db } from '../../../utils/firebaseConfig'
import { User } from '../../../utils/Types' 

const Users = () => {
	const [users, setUsers] = useState<User[]>([])

	useEffect(() => {
		const fetchUsers = async () => {
			const usersCollection = collection(db, 'users')
			const usersSnapshot = await getDocs(usersCollection)

			const usersData: User[] = []
      
			usersSnapshot.forEach(doc => {
				const userData = doc.data() as DocumentData
        console.log(userData);
        
				const user: User = {
					id: doc.id,
					name: userData.displayName,
					email: userData.email,
          role: userData.role,
          photo: userData.photoURL
				}
				usersData.push(user)
			})

			setUsers(usersData)
		}

		fetchUsers()
	}, [])

	return (
		<div>
			<h1>Users</h1>
			<ul>
				{users.map(user => (
					<li key={user.id}>
						{user.name} - {user.email} -{user.role}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Users
