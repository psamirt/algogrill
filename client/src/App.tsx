import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Burger from './pages/Burger'
import ScrollToTop from 'react-scroll-to-top'
import { AuthProvider } from './context/AuthContext'
import Register from './components/modal/Register'

const App = (): JSX.Element => {
	return (
		<AuthProvider>
		<Navbar />
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/menu' element={<Burger />}></Route>
				<Route path='/register' element={<Register />}></Route>
			</Routes>
			<ScrollToTop smooth />
		</AuthProvider>
	)
}

export default App
