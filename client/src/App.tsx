import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Burger from './pages/Burger'
import ScrollToTop from 'react-scroll-to-top'
import Login from './components/modal/Login'
import { AuthProvider } from './context/authContext'

const App = (): JSX.Element => {
	return (
		<AuthProvider>
			<div>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/menu' element={<Burger />}></Route>
					<Route path='/login' element={<Login />}></Route>
				</Routes>
				<ScrollToTop smooth />
			</div>
		</AuthProvider>
	)
}

export default App
