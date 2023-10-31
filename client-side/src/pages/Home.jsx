import React, { useContext } from 'react'
import heroImage from '../assets/images/hero-img01.png'
import heroImage2 from '../assets/images/hero-img02.png'
import heroImage3 from '../assets/images/hero-img03.png'
import icon1 from '../assets/images/icon01.png'
import icon2 from '../assets/images/icon02.png'
import icon3 from '../assets/images/icon03.png'
import featrueImg from '../assets/images/feature-img.png'
import faqImg from '../assets/images/faq-img.png'
import { Link } from 'react-router-dom'
import About from '../components/About/About'
import ServicesList from '../components/Services/ServicesList'
import DoctorsList from '../components/Doctors/DoctorsList'
import FaqList from '../components/Question/FaqList'
import Testimonial from '../components/Testimonial/Testimonial'
import { AuthContext } from '../context/AuthContext'

function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {/* hero section */}
      <section className='hero__section pt-[30px] h-full 2xl:h-[620px] overflow-hidden'>
        <div className='container '>
          <div className='flex flex-col xl:flex-row gap-[90px] items-center justify-between'>
            {/* hero content */}
            <div>
              <div className='lg:w-[570px] '>
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px] '>
                  We Care About Your Health
                </h1>
                <p className='text-[16px] leading-[26px] text-textColor font-[400] mt-[20px]'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                  voluptatem, voluptatum, repellendus, voluptate quia dolorum
                  voluptas quas quod quibusdam natus doloribus. Quisquam
                  voluptatem, voluptatum, repellendus, voluptate quia dolorum
                  voluptas quas quod quibusdam natus doloribus.
                </p>
                <div className='flex gap-4 mt-[30px]'>
                  <button className='bg-primaryColor py-2 px-5 text-white font-[500] h-[36px] flex items-center justify-center rounded-xl'>
                    Get Started
                  </button>
                  <button className='bg-white py-2 px-5 text-primaryColor font-[500] h-[36px] flex items-center justify-center rounded-xl'>
                    Learn More
                  </button>
                </div>
              </div>

              {/* hero counter */}
              <div className='mt-[30px] lg:mt-[70px] flex flex-col sm:flex-row lg:items-center gap-5 lg:gap-[30px]'>
                <div className='flex flex-col items-center justify-center'>
                  <h2
                    className='text-[32px] z-1 leading-[40px] text-headingColor font-[700] md:text-[50px] md:leading-[70px] '
                    data-target='100'>
                    +30
                  </h2>
                  <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-8px]'></span>
                  <p className='text-[16px] leading-[26px] text-textColor font-[400] mt-[10px]'>
                    Years of Experience
                  </p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <h2
                    className='text-[32px] z-1 leading-[40px] text-headingColor font-[700] md:text-[50px] md:leading-[70px] '
                    data-target='100'>
                    +30
                  </h2>
                  <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-8px]'></span>
                  <p className='text-[16px] leading-[26px] text-textColor font-[400] mt-[10px]'>
                    Years of Experience
                  </p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <h2
                    className='text-[32px] z-1 leading-[40px] text-headingColor font-[700] md:text-[50px] md:leading-[70px] '
                    data-target='100'>
                    +30
                  </h2>
                  <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-8px]'></span>
                  <p className='text-[16px] leading-[26px] text-textColor font-[400] mt-[10px]'>
                    Years of Experience
                  </p>
                </div>
              </div>
            </div>

            {/* hero content  */}
            
            <div className='flex gap-[30px] justify-end '>
              <div>
                <img className='w-full' src={heroImage} alt='' />
              </div>
              <div className='mt-[30px]'>
                <img className='w-full mb-[30px]' src={heroImage2} alt='' />
                <img className='w-full' src={heroImage3} alt='' />
                </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
          <div className='lg:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Providing the best medical services</h2>
            <p className='text-center text-textColor mt-[20px]'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatem, voluptatum, repellendus, voluptate quia dolorum
              voluptas quas quod quibusdam natus doloribus.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[50px]'>
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon1} alt='' />
              </div>
              <div className='mt-[30px'>
                <h2
                className='text-[20px] text-center leading-[30px] text-headingColor font-[700] md:text-[30px] md:leading-[40px] '
                >
                  Find a Doctor
                </h2>
                <p className='text-[14px] text-center leading-[26px] text-textColor font-[400] mt-[10px]'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatem, voluptatum, repellendus, voluptate quia
                </p>
                <Link to={"/doctors"}>
                  <button className='bg-primaryColor py-2 px-5 text-white font-[500] h-[36px] flex items-center justify-center rounded-xl mt-[20px] mx-auto'>
                    Find Now
                  </button>
                </Link>
              </div>
            </div>
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon2} alt='' />
              </div>
              <div className='mt-[30px'>
                <h2
                className='text-[20px] text-center leading-[30px] text-headingColor font-[700] md:text-[30px] md:leading-[40px] '
                >
                  Find a Location
                </h2>
                <p className='text-[14px] text-center leading-[26px] text-textColor font-[400] mt-[10px]'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatem, voluptatum, repellendus, voluptate quia
                </p>
                <Link to={"/doctors"}>
                  <button className='bg-primaryColor py-2 px-5 text-white font-[500] h-[36px] flex items-center justify-center rounded-xl mt-[20px] mx-auto'>
                    Find Now
                  </button>
                </Link>
              </div>
            </div>
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon3} alt='' />
              </div>
              <div className='mt-[30px'>
                <h2
                className='text-[20px] text-center leading-[30px] text-headingColor font-[700] md:text-[30px] md:leading-[40px] '
                >
                  Booking Appointment
                </h2>
                <p className='text-[14px] text-center leading-[26px] text-textColor font-[400] mt-[10px]'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatem, voluptatum, repellendus, voluptate quia
                </p>
                <Link to={"/doctors"}>
                  <button className='bg-primaryColor py-2 px-5 text-white font-[500] h-[36px] flex items-center justify-center rounded-xl mt-[20px] mx-auto'>
                    Find Now
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* about  */}
      <section>
        <About />
      </section>

      {/* services section */}

      <section className='services__section py-[10px] lg:py-[20px]'>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Our Services</h2>
            <p className='text-center text-textColor mt-[20px]'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatem, voluptatum, repellendus, voluptate quia dolorum
              voluptas quas quod quibusdam natus doloribus.
            </p>
          </div>
          <ServicesList />
        </div>
      </section>


      {/* feature section */}
      <section>
        <div className='container'>
          <div className='flex items-center justify-between flex-col lg:flex-row'>
            {/* feature content */}
            <div className='xl:w-[670px]'>
              <h2 className='heading'>
                We Provide High Quality Services
              </h2>

              <ul className='pl-4 flex flex-col items-center justify-center lg:items-start justify-start'>
                <li className="text-[16px] leading-[26px] text-textColor font-[400] mt-[10px] flex items-center gap-2">
                  1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li className="text-[16px] leading-[26px] text-textColor font-[400] mt-[10px] flex items-center gap-2">
                  2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li className="text-[16px] leading-[26px] text-textColor font-[400] mt-[10px] flex items-center gap-2">
                  3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
              </ul>
                <Link to={"/"}>
                  <button className='bg-primaryColor py-2 px-4 text-white font-[500] h-[36px] flex items-center justify-center rounded-2xl mt-[20px] mx-auto lg:mx-0'>
                    Learn More
                  </button>
                </Link>
            </div>

            {/* featured image */}
            <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
              <img className='' src={featrueImg} alt='' />
            </div>
          </div>
        </div>
      </section>

      {/* great doctors section */}
      <section>
        <div className="container">
          <div className='xl:w-[470px] mx-auto'>
              <h2 className='heading text-center'>Our Greate Doctors</h2>
              <p className='text-center text-textColor mt-[20px]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                voluptatem, voluptatum, repellendus, voluptate quia dolorum
                voluptas quas quod quibusdam natus doloribus.
              </p>
          </div>
          <DoctorsList />
        </div>
      </section>

      {/* faq section */}
      <section className='faq__section py-[10px] lg:py-[20px]'>
        <div className="container">
          <div className='flex justify-between gap-[50px] lg:gap-0'>
            <div className='w-1/2 hidden md:block '>
              <img className='h-[550px]'  src={faqImg} alt='' />
            </div>

            <div className='w-full md:w-1/2'>
              <h2 className='heading'>
                Frequently Asked Questions
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>


      {/* testimonials section */}
      <section>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Testimonials</h2>
            <p className='text-center text-textColor mt-[20px]'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatem, voluptatum, repellendus, voluptate quia dolorum
              voluptas quas quod quibusdam natus doloribus.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  )
}

export default Home