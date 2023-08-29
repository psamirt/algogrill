import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar: React.FC = () => {
  return (
    <div className='header'>
      <div className='container-navbar'>
        <div className='logo-search-container'>
          <div className='search-container'>
            <img src="search.svg" alt="search" className='search-item'/>
            <input type="text" className='search-input' placeholder='Buscar' />
          </div>
        </div>
        <div className='container-list'>
          <ul className='ul-class'>
            <li className='list-item'><Link to='/about'>Productos</Link></li>
            <li className='list-item'><Link to='/menu'>Menu</Link></li>
            <li className='list-item'><Link to='/promociones'>Promociones</Link></li>
            <li className='list-item'><Link to='/restaurant'>Locales</Link></li>
          </ul>
        </div>
          <img src="logo.svg" alt="logo" className='navbar-logo' />
        <button className='login-button'>
          <img src="user.svg" alt="user" />
          Iniciar sesión
        </button>
      </div>
    </div>
  )
}

export default Navbar
