import React from 'react'
import { BiSolidArrowToRight } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function ServicesCard({item, index}) {

    const {name , desc , bgColor , textColor} = item
  return (
    <div className='py-[30px] px-3 lg:px-5'>
        <h2 className='text-[26px] leading-9 text-headingColor font-[700]'>
            {name}
        </h2>
        <p className='text-[14px] leading-[26px] text-textColor font-[400] mt-[10px]'>
            {desc}
        </p>
        <div className='flex items-center justify-between mt-[30px]'>
           <Link to={"/services"} className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none transition-all duration-300'>
                <BiSolidArrowToRight className='text-[20px] text-primaryColor group-hover:text-white transition-all duration-300' />
            </Link>
            <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center`} style={{
                backgroundColor: bgColor,
                color: textColor
            }}>
                {index + 1}
            </div>
        </div>
    </div>
  )
}

export default ServicesCard