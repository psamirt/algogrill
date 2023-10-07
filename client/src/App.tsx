import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom'
import Burger from './pages/admin/products/Burger.js'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/user/loginRegister/Register.js'
import ResetPassword from './pages/user/loginRegister/ResetPassword.js'
import { Provider } from 'react-redux'
import {store} from './app/store.js'
import CreateProduct from './pages/admin/products/CreateProduct.js'
import Admin from './pages/admin/Admin.js'

const App = (): JSX.Element => {
	return (
		<Provider store={store}>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/admin' element={<Admin />}></Route>
					<Route path='/menu' element={<Burger />}></Route>
					<Route path='/register' element={<Register />}></Route>
					<Route path='/resetPassword' element={<ResetPassword />}></Route>
					<Route path='/newProduct' element={<CreateProduct />}></Route>
				</Routes>
			</AuthProvider>
		</Provider>
	)
}

export default App
