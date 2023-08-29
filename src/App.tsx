import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'

const App = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}>
        </Route>
      </Routes>
    </div>
  )
}

export default App
