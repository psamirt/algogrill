import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSetActiveLink = (link: string): void => {
    setActiveLink(link)
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
        <li className='list-item'><NavLink to='/' className={activeLink === '/' ? 'active' : ''} onClick={() => { handleSetActiveLink('/') }}>Inicio</NavLink></li>
        <li className='list-item'><NavLink to='/menu' className={activeLink === '/menu' ? 'active' : ''} onClick={() => { handleSetActiveLink('/menu') }}>Menu</NavLink></li>
        <li className='list-item'><NavLink to='/promociones' className={activeLink === '/promociones' ? 'active' : ''} onClick={() => { handleSetActiveLink('/promociones') }}>Promociones</NavLink></li>
        <li className='list-item'><NavLink to='/restaurant' className={activeLink === '/restaurant' ? 'active' : ''} onClick={() => { handleSetActiveLink('/restaurant') }}>Locales</NavLink></li>
      </ul>
      <img src="logo.svg" alt="logo" className='navbar-logo' />
      <button className={'login-button mobile-login-button'}>
        <img src="user.svg" alt="user" />
      </button>
    </div>
  )
}

export default Navbar
