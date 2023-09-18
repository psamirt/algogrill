import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Burger from './pages/Burger'
import ScrollToTop from "react-scroll-to-top";

const App = (): JSX.Element => {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/menu' element={<Burger />}></Route>
			</Routes>
			<ScrollToTop smooth />
		</div>
	)
}

export default App