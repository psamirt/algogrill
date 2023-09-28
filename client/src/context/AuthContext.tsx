import{ createContext, useContext, ReactNode } from 'react'
import { auth } from '../utils/firebaseConfig'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	UserCredential
} from 'firebase/auth'

interface IAuthContext {
	register: (email: string, password: string) => Promise<void>,
	login: (email: string, password: string) => Promise<void>,
	loginWithGoogle: () => Promise<UserCredential>,
	logout: () => Promise<void>
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
	const register = async (email: string, password: string) => {
		const response = await createUserWithEmailAndPassword(auth, email, password)
		console.log(response)
	}
	const login = async (email: string, password: string) => {
		const response = await signInWithEmailAndPassword(auth, email, password)
		console.log(response)
	}
	const loginWithGoogle = async () => {
		const responseGoogle = new GoogleAuthProvider()
		return signInWithPopup(auth, responseGoogle)
	}
	const logout = async () => {
		const responseOut = await signOut(auth)
		console.log(responseOut)
	}
	return (
		<authContext.Provider value={{ register, login, loginWithGoogle, logout }}>
			{children}
		</authContext.Provider>
	)
}
