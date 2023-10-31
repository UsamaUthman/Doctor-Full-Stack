import React from 'react'
import { Pagination } from 'swiper/modules';

import {Swiper, SwiperSlide} from 'swiper/react'
import PatientAvatar from '../../assets/images/patient-avatar.png'
import {HiStar} from 'react-icons/hi'


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/autoplay"



function Testimonial() {
  return (
   <div className='mt-[30px] lg:mt-[55px]'>
    <Swiper
    modules={[Pagination]}
    spaceBetween={30}
    slidesPerView={1}
    pagination={{ clickable: true }}
    breakpoints={{
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
        }}>
            <SwiperSlide>
                <div className='py-[25px] px-5 rounded-[13px] w-full '>
                    <div className='flex items-center gap-[13px]'>
                        <img src={PatientAvatar} alt="" className='w-[50px] h-[50px] rounded-full' />
                        <div>
                            <h4 className='flex space-x-2'>
                                <span className='text-[#1e56a0]'>John Doe</span> <br />
                                <span className='text-[#6b7280]'>Patient</span>
                            </h4>
                            <div className='flex items-center gap-[2px]'>
                                <HiStar className='text-[#f59e0b]' />
                                <HiStar className='text-[#f59e0b]' />
                                <HiStar className='text-[#f59e0b]' />
                                <HiStar className='text-[#f59e0b]' />
                            </div>
                        </div>
                    </div>
                    <p className='mt-[10px] text-[#6b7280]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptatum.</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='py-[25px] px-5 rounded-[13px] w-full '>
                    <div className='flex items-center gap-[13px]'>
                        <img src={PatientAvatar} alt="" className='w-[50px] h-[50px] rounded-full' />
                        <div>
                            <h4 className='flex space-x-2'>
                                <span className='text-[#1e56a0]'>John Doe</span> <br />
                                <span className='text-[#6b7280]'>Patient</span>
                            </h4>
                            <div className='flex items-center gap-[2px]'>
                                <HiStar className='text-[#f59e0b]' />
                                <HiStar className='text-[#f59e0b]' />
                                <HiStar className='text-[#f59e0b]' />
                                <HiStar className='text-[#f59e0b]' />
                            </div>
                        </div>
                    </div>
                    <p className='mt-[10px] text-[#6b7280]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptatum.</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='py-[25px] px-5 rounded-[13px] w-full '>
                    <div className='flex items-center gap-[13px]'>
                        <img src={PatientAvatar} alt="" className='w-[50px] h-[50px] rounded-full' />
                        <div>
                            <h4 className='flex space-x-2'>
                                <span className='text-[#1e56a0]'>John Doe</span> <br />
                                <span className='text-[#6b7280]'>Patient</span>
                            </h4>
                            <div className='flex items-center gap-[2px]'>
                                <HiStar className='text-[#f59e0b]' />
                                <HiStar className='text-[#f59e0b]' />
                                <HiStar className='text-[#f59e0b]' />
                                <HiStar className='text-[#f59e0b]' />
                            </div>
                        </div>
                    </div>
                    <p className='mt-[10px] text-[#6b7280]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptatum.</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='py-[25px] px-5 rounded-[13px] w-full '>
                    <div className='flex items-center gap-[13px]'>
                        <img src={PatientAvatar} alt="" className='w-[50px] h-[50px] rounded-full' />
                        <div>
                            <h4 className='flex space-x-2'>
                                <span className='text-[#1e56a0]'>John Doe</span> <br />
                                <span className='text-[#6b7280]'>Patient</span>
                            </h4>
                            <div className='flex items-center gap-[2px]'>
                                <HiStar className='text-[#f59e0b]' />
                                <HiStar className='text-[#f59e0b]' />
                                <HiStar className='text-[#f59e0b]' />
                                <HiStar className='text-[#f59e0b]' />
                            </div>
                        </div>
                    </div>
                    <p className='mt-[10px] text-[#6b7280]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptatum.</p>
                </div>
            </SwiperSlide>

    </Swiper>
   </div>
  )
}

export default Testimonial