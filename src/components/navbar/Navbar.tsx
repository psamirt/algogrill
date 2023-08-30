import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className={`container-navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className='logo-search-container'>
        <i className='fa-solid fa-bars' id='btn-menu' onClick={toggleMenu}></i>
        {isMenuOpen && <div className="back-menu" onClick={toggleMenu}></div>}
        <img src="search.svg" alt="search" className='search-item' />
        <input type="text" className='search-input' placeholder='Buscar' />
      </div>
      <ul className={`ul-class ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
        <li className='list-item'><NavLink to='/'>Inicio</NavLink></li>
        <li className='list-item'><NavLink to='/menu'>Menu</NavLink></li>
        <li className='list-item'><NavLink to='/promociones'>Promociones</NavLink></li>
        <li className='list-item'><NavLink to='/restaurant'>Locales</NavLink></li>
      </ul>
      <img src="logo.svg" alt="logo" className='navbar-logo' />
      <button className={'login-button mobile-login-button'}>
        <img src="user.svg" alt="user" />
      </button>
    </div>
  )
}

export default Navbar
