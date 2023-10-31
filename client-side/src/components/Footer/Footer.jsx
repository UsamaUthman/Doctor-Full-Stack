import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

function Footer() {
  return (
    <footer className='bg-[#1e56a0]'>
      <div className='container mx-auto py-[50px] px-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]'>
          <div>
            <img src={logo} alt="" className='w-[150px] h-[50px]' />
            <p className='mt-[20px] text-[#fff] text-[16px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
            <div className='flex items-center gap-[20px] mt-[30px]'>
              <FaFacebookF className='text-[#fff] text-[20px]' />
              <FaTwitter className='text-[#fff] text-[20px]' />
              <FaInstagram className='text-[#fff] text-[20px]' />
            </div>
          </div>
          <div>
            <h4 className='text-[#fff] text-[20px]'>Quick Links</h4>
            <ul className='mt-[20px]'>
              <li className='mt-[10px]'>
                <Link to='/' className='text-[#fff] text-[16px] hover:text-[#f59e0b]'>Home</Link>
              </li>
              <li className='mt-[10px]'>
                <Link to='/services' className='text-[#fff] text-[16px] hover:text-[#f59e0b]'>Services</Link>
              </li>
              <li className='mt-[10px]'>
                <Link to='/doctors' className='text-[#fff] text-[16px] hover:text-[#f59e0b]'>Doctors</Link>
              </li>
              <li className='mt-[10px]'>
                <Link to='/contact' className='text-[#fff] text-[16px] hover:text-[#f59e0b]'>Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-[#fff] text-[20px]'>Contact Us</h4>
            <ul className='mt-[20px]'>
              <li className='mt-[10px]'>
                <span className
                ='text-[#fff] text-[16px]'>Address:</span>
                <span className='text-[#fff] text-[16px]'> 123, Street name, City name, Country name</span>
              </li>
              <li className='mt-[10px]'>
                <span className='text-[#fff] text-[16px]'>Phone:</span>
                <span className='text-[#fff] text-[16px]'> +880 123456789</span>
              </li>
              <li className='mt-[10px]'>
                <span className='text-[#fff] text-[16px]'>Email:</span>
                <span className='text-[#fff] text-[16px]'>
                  <HiOutlineMail className='text-[#fff] text-[16px]' /> info@yourdomain
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-[#fff] text-[20px]'>Subscribe</h4>
            <p className='mt-[20px] text-[#fff] text-[16px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
            <div className='mt-[20px]'>
              <input type="text" placeholder='Enter your email' className='w-full py-[10px] px-[15px] rounded-[5px] outline-none' />
              <button className='bg-[#f59e0b] text-[#fff] py-[10px] px-[15px] rounded-[5px] mt-[10px]'>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#1e56a0] py-[20px]'>
        <div className='container mx-auto'>
          <p className='text-[#fff] text-[16px] text-center'>&copy; 2021 All Rights Reserved. Developed by <span className='text-[#f59e0b]'>Usama Uthman</span></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer