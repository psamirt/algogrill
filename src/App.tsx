import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Menu from './pages/Menu'

const App = (): JSX.Element => {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/menu' element={<Menu />}></Route>
			</Routes>
		</div>
	)
}

export default App
