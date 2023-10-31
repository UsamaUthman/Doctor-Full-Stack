import React from 'react'
import about from '../../assets/images/about.png'
import aboutCard from '../../assets/images/about-card.png'

function About() {
  return (
    <section>
        <div className='container'>
            <div className='flex justify-between items-center gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
                {/* about image */}
                <div className='relative w-3/4 lg:w-1/2 xl:w-[550px] z-10 order-2 lg:order-1'>
                    <img className='w-full' src={about} alt='' />
                    <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-20%] md:right-[-7%] lg:right-[-22%]'>
                        <img className='w-full' src={aboutCard} alt='' />
                    </div>
                </div>
                
                {/* about content */}
                <div className='w-full lg:w-1/2 xl:w-[550px] order-1 lg:order-2'>
                    <div className='flex flex-col justify-center items-center gap-5 lg:gap-8'>
                        <div className='flex flex-col items-center justify-center'>
                            <h2 className='text-[30px] lg:text-[40px] xl:text-[50px] text-headingColor font-[700] text-center lg:text-left'>
                                About Us
                            </h2>
                            <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-8px]'></span>
                        </div>
                        
                        <p className='text-[16px] lg:text-[18px] xl:text-[20px] text-textColor font-[400] text-center lg:text-left'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Quisquam, voluptates. Quisquam, voluptates. Quisquam, voluptates. 
                        </p>
                        <p className='text-[16px] lg:text-[18px] xl:text-[20px] text-textColor font-[400] text-center lg:text-left'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Quisquam, voluptates. Quisquam, voluptates. Quisquam, voluptates. 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About