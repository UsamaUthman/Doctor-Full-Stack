import React from 'react'
import { Link } from 'react-router-dom'

function DoctorsCard({item}) {

  const {id , name , specialty , avgRating , totalRating , photo , totalPatients , hospital} = item

  return (
    <div className='bg-white rounded-md shadow-md p-5'>
      <div className='flex flex-col items-center justify-between'>
        <div className='flex flex-col items-center'>
          <img src={photo} alt={name} className='w-[100px] h-[100px] rounded-full' />
          <div className='mt-5'>
            <h3 className='text-xl font-semibold'>{name}</h3>
            <p className='text-sm text-gray-500 text-center'>{specialty}</p>
          </div>
        </div>
        <div className='flex items-center'>
          <p className='text-sm text-gray-500 mr-1'>{avgRating}</p>
          <div className='flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 1l2.598 6.854h7.902l-6.386 4.947 2.598 6.854L10 13.708l-6.713 4.947 2.598-6.854L0 7.854h7.902L10 1z" clipRule="evenodd" />
            </svg>
            <p className='text-sm text-gray-500'>{totalRating}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-between mt-3 gap-4'>
        <div className='flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 1l2.598 6.854h7.902l-6.386 4.947 2.598 6.854L10 13.708l-6.713 4.947 2.598-6.854L0 7.854h7.902L10 1z" clipRule="evenodd" />
          </svg>
          <p className='text-sm text-gray-500 ml-1'>{totalPatients}</p>
        </div>
        <p className='text-sm text-gray-500'>{hospital}</p>
      </div>

      <Link
        to={`/doctors/${id}`}
        className='flex items-center justify-center w-full'
      >
        <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-5 py-2 mt-5 mx-auto'>Book Appointment</button>
      </Link>
    </div>

  )
}

export default DoctorsCard