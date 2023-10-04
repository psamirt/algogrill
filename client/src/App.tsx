import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom'
import Burger from './pages/Burger'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/user/Register'
import ResetPassword from './pages/user/ResetPassword'
import Dashboard from './pages/dashboard/Dashboard'

const App = (): JSX.Element => {
	return (
		<AuthProvider>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='admin' element={<Dashboard />}></Route>
				<Route path='/menu' element={<Burger />}></Route>
				<Route path='/register' element={<Register />}></Route>
				<Route path='/resetPassword' element={<ResetPassword />}></Route>
			</Routes>
		</AuthProvider>
	)
}

export default App
