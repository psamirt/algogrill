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
				const user: User = {
					id: doc.id,
					name: userData.displayName,
					email: userData.email,
					role: userData.role,
					photo: userData.photoURL,
				}
				usersData.push(user)
			})

			setUsers(usersData)
		}

		fetchUsers()
	}, [])

	return (
		<div className=' max-h-[full] h-full p-8'>
			<table className='min-w-full border rounded-lg '>
				<thead className='bg-gray-800 border'>
					<tr className='text-left uppercase text-slate-100'>
						<th className='py-2 px-4'>id</th>
						<th className='py-2 px-4'>nombre</th>
						<th className='py-2 px-4'>email</th>
						<th className='py-2 px-4'>tipo</th>
						<th className='py-2 px-4'>imagen</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => {
						return (
							<tr key={user.id} className='bg-slate-200'>
								<td className='py-2 px-4'>{user.id}</td>
								<td className='py-2 px-4'>{user.name}</td>
								<td className='py-2 px-4'>{user.email}</td>
								<td className='py-2 px-4'>{user.role}</td>
								<td className='py-2 px.4 items-center justify-center flex'>
									<img
										src={user.photo}
										alt={user.photo}
										className='h-10 w-10 object-cover rounded'
									/>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default Users

