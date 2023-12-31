import {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	useState,
} from 'react'
import { auth } from '../utils/firebaseConfig'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	UserCredential,
	User,
	sendPasswordResetEmail,
	FacebookAuthProvider,
} from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

interface IAuthContext {
	register: (
		email: string,
		password: string,
		name: string,
		photo: string | null,
	) => Promise<void>
	login: (email: string, password: string) => Promise<void>
	loginWithGoogle: () => Promise<UserCredential>
	logout: () => Promise<void>
	loginWithFacebook: () => Promise<UserCredential>
	user: User | null
	loading: boolean
	resetPassword: (email: string) => Promise<void>
}

export const authContext = createContext<IAuthContext | undefined>(undefined)

export const useAuth = (): IAuthContext => {
	const context = useContext(authContext)

	if (!context) {
		throw new Error('useAuth debe estar dentro del proveedor AuthContext')
	}
	return context
}

interface IAuthProviderProps {
	children: ReactNode
}

export function AuthProvider({ children }: IAuthProviderProps) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const firestore = getFirestore()

	const register = async (
		email: string,
		password: string,
		name: string,
		photo: string | null,
	) => {
		try {
			const role = 'admin'
			const infoUser = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			)

			if (infoUser.user) {
				const { uid } = infoUser.user
				const docuRef = doc(firestore, `users/${uid}`)
				const photoURL =
					photo ||
					'https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png'
				await setDoc(docuRef, {
					email: email,
					role: role,
					id: uid,
					displayName: name,
					photoURL: photoURL,
				})
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	const login = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password)
	}

	const loginWithGoogle = async () => {
		const provider = new GoogleAuthProvider()
		try {
			const response = await signInWithPopup(auth, provider)
			if (response.user) {
				const { uid, email, displayName, photoURL } = response.user
				const docuRef = doc(firestore, `users/${uid}`)
				const docSnap = await getDoc(docuRef)
				if (docSnap.exists() && docSnap.data()?.role) {
					console.log('El usuario ya tiene un rol asignado.')
				} else {
					const role = 'user'
					await setDoc(docuRef, {
						email: email,
						displayName: displayName,
						photoURL: photoURL,
						role: role,
						id: uid,
					})
				}
			}
			return response
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	const loginWithFacebook = async () => {
		const provider = new FacebookAuthProvider()
		try {
			const response = await signInWithPopup(auth, provider)
			if (response.user) {
				const { uid, email, displayName, photoURL } = response.user
				const docuRef = doc(firestore, `users/${uid}`)
				const docSnap = await getDoc(docuRef)
				if (docSnap.exists() && docSnap.data()?.role) {
					console.log('El usuario ya tiene un rol asignado.')
				} else {
					const role = 'user'
					await setDoc(docuRef, {
						email: email,
						displayName: displayName,
						photoURL: photoURL,
						role: role,
						id: uid,
					})
				}
			}
			return response
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	const resetPassword = (email: string) => {
		return sendPasswordResetEmail(auth, email)
	}
	const logout = async () => {
		await signOut(auth)
	}

	useEffect(() => {
		onAuthStateChanged(auth, currentUser => {
			setUser(currentUser)
			setLoading(false)
		})
	}, [])
	return (
		<authContext.Provider
			value={{
				register,
				login,
				loginWithGoogle,
				loginWithFacebook,
				logout,
				user,
				loading,
				resetPassword,
			}}
		>
			{children}
		</authContext.Provider>
	)
}
