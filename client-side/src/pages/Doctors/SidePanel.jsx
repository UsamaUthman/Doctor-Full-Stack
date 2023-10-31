import React from 'react'

function SidePanel() {
  return (
    <div className='shadow-lg p-3 lg:p-5 rounded-md '>
        <div className='flex items-center justify-between'>
            <p className='text__para mt-0 font-semibold'>
                ticket price 
            </p>
            <p className='text__para mt-0 font-semibold'>
                $ 200
            </p>
        </div>

        <div className='mt-[30px]'>
            <p className='text__para mt-0 font-bold'>
                <span className='text-green-400'>Available</span> times Slots:
            </p>

            <ul className='mt-3 space-y-4'>
                <li className='flex items-center justify-between'>
                    <p className='text__para mt-0 font-semibold'>
                        Tuesday
                    </p>
                    <p className='text__para mt-0 font-semibold'>
                        10:00 AM - 12:00 PM
                    </p>
                </li>
                <li className='flex items-center justify-between'>
                    <p className='text__para mt-0 font-semibold'>
                        Tuesday
                    </p>
                    <p className='text__para mt-0 font-semibold'>
                        10:00 AM - 12:00 PM
                    </p>
                </li>
                <li className='flex items-center justify-between'>
                    <p className='text__para mt-0 font-semibold'>
                        Tuesday
                    </p>
                    <p className='text__para mt-0 font-semibold'>
                        10:00 AM - 12:00 PM
                    </p>
                </li>
            </ul>
            <div className='mt-[30px]'>
                <button className='bg-[#3D83FF] text-white rounded-md px-5 py-2 w-full'>Book Appointment</button>
            </div>
        </div>
    </div>
  )
}

export default SidePanel