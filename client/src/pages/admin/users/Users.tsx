import { useEffect } from 'react'
import { fetchUsers } from '../../../app/redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'app/store'
import { User } from 'utils/Types'

const Users = () => {
	const dispatch: ThunkDispatch<RootState, unknown, AnyAction> =
		useDispatch<AppDispatch>()

	const users = useSelector((state: RootState): User[] => state.user)

	useEffect(() => {
		const getUsers = async () => {
			try {
				await dispatch(fetchUsers())
			} catch (error) {
				console.error('Error al obtener el usuario:', error)
			}
		}
		getUsers()
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
								<td className='py-2 px-4 items-center justify-center flex'>
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
