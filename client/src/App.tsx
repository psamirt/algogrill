import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/user/loginRegister/Register.js'
import ResetPassword from './pages/user/loginRegister/ResetPassword.js'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import Admin from './pages/admin/Admin.js'
import Menu from './pages/menu/Menu.js'
import Cart from './pages/user/cart/Cart.js'
import ProtectRoute from './components/protectetRoute/ProtectRoute.js'
import { Toaster } from 'react-hot-toast'
import Success from './components/paymentPages/Success.js'
import Failure from './components/paymentPages/Failure.js'
import Pending from './components/paymentPages/Pending.js'

const App = (): JSX.Element => {
	return (
		<Provider store={store}>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/register' element={<Register />}></Route>
					<Route path='/resetPassword' element={<ResetPassword />}></Route>
					<Route path='/success' element={<Success />}></Route>
					<Route path='/failure' element={<Failure />}></Route>
					<Route path='/pending' element={<Pending />}></Route>
					<Route path='/menu' element={<Menu />} />
					<Route path='/cart/:userId' element={<Cart />} />
					<Route
						path='/admin'
						element={
							<ProtectRoute>
								<Admin />
							</ProtectRoute>
						}
					></Route>
				</Routes>
				<Toaster />
			</AuthProvider>
		</Provider>
	)
}

export default App

