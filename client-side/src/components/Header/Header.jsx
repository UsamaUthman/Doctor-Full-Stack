import React , {useContext, useEffect, useRef} from 'react'
import logo  from '../../assets/images/logo.png'
import userImg from '../../assets/images/avatar-icon.png'
import { BiMenu } from 'react-icons/bi'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import {FiLogOut} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function Header() {
  const { currentUser , logout } = useContext(AuthContext);
  const navigate = useNavigate()
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/services' },
    { title: 'Doctors', path: '/doctors' },
    { title: 'Contact', path: '/contact' },
  ]

  const headerRef = useRef(null)
  const menuRef = useRef(null)

  const handleStickHeader = () => {
   window.addEventListener('scroll', () => {
     if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
       headerRef.current.classList.add('sticky-header')
     } else {
        headerRef.current.classList.remove('sticky-header')
     }
    })
  }

  const toggleMenu = () => {
    menuRef.current.classList.toggle('show__menu')
  }

  useEffect(() => {
    handleStickHeader()
    return () => {
      window.removeEventListener('scroll', handleStickHeader)
    }
  }, [])
  

  return (
    <header className='header flex items-center' ref={headerRef}>
      <div className='container'>
        <div className='flex justify-between items-center'>
          {/* logo */}
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>

          {/* menu */}
          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink  to={link.path} className={navClass => navClass.isActive ? "text-primaryColor text-[16px] leading-7 font-600" : "text-textColor text-[16px] leading-7 font[600]"}>
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* nav right */}
          <div className='flex items-center gap-2'>
              {currentUser ? (
                   <div className='flex gap-2 items-center'>
                    <Link to={`/profile/${currentUser?._id}`}>
                      <figure className='w-[40px] h-[40px] rounded-full cursor-pointer'>
                        <img src={ currentUser.photo||userImg} className='w-full rounded-full' alt="" />
                      </figure>
                    </Link>
                    <FiLogOut className='text-[25px]  cursor-pointer' onClick={()=>{
                      logout()
                      navigate('/login')
                    }} />
                 </div>
              ) : (
                <Link to={"/login"} className='hidden md:block'>
                  <button className='bg-primaryColor py-2 px-5 text-white font-[500] h-[36px] flex items-center justify-center rounded-xl'>Login</button>
                </Link>
              )}
              <span className='md:hidden' onClick={toggleMenu}>
                <BiMenu  className='text-[35px] text-primaryColor cursor-pointer' />
              </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header