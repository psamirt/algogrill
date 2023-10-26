import React, { ReactNode, useState, useEffect } from 'react'
import { User } from '../../utils/Types'
import { fetchUsers } from '../../app/redux/actions/userAction'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

interface ProtectRouteProps {
	children: ReactNode
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
	const [users, setUsers] = useState<User[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		const getUsers = async () => {
			try {
				const data = await fetchUsers()
				setUsers(data)
			} catch (error) {
				console.error('Error al obtener el usuario:', error)
			}
		}
		getUsers()
	}, [])

	const { user } = useAuth()
	const authenticatedUserUID = user?.uid
	const selectedUser = users.find(u => u.id === authenticatedUserUID)

	useEffect(() => {
		if (selectedUser && selectedUser.role !== 'admin') {
			navigate('/')
		}
	}, [selectedUser, navigate])

	if (selectedUser && selectedUser.role === 'admin') {
		return <div>{children}</div>
	}

	return null
}

export default ProtectRoute
