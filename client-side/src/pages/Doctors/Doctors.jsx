import React, { useState } from 'react';
import DoctorsCard from '../../components/Doctors/DoctorsCard';
import { doctors } from './../../assets/data/doctors';
import Testimonial from '../../components/Testimonial/Testimonial';

function Doctors() {
  const [searchInput, setSearchInput] = useState('');
  
  // Filter doctors based on the search input
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      {/* Create search bar */}
      <div className="container">
        <h1 className="text-2xl text-red-500 font-bold mt-[30px] lg:mt-[55px] text-center">
          Api Booking is not working now
        </h1>
        <h1 className="text-2xl font-bold mt-[30px] lg:mt-[55px] text-center">Find a Doctor</h1>
        <div className="flex justify-center items-center mt-[30px] lg:mt-[55px]">
          <input
            type="text"
            className="w-full lg:w-[50%] border-2 border-gray-300 rounded-md p-2"
            placeholder="Search Doctors"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="bg-[#3D83FF] text-white rounded-md px-5 py-2 ml-2">Search</button>
        </div>
      </div>
      {/* Display filtered doctors or "Not Found" message */}
      <section>
        <div className="container">
          {filteredDoctors.length === 0 ? (
            <p className="text-center text-2xl mt-5">Not Found</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
              {filteredDoctors.map((item) => (
                <DoctorsCard key={item.id} item={item} />
              ))}
            </div>
          )}
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
  );
}

export default Doctors;
