import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import {BiError} from "react-icons/bi"
import DoctorsCard from '../../components/Doctors/DoctorsCard';
import Testimonial from '../../components/Testimonial/Testimonial';
import { AuthContext } from '../../context/AuthContext';

function Doctors() {
  const {getAllDoctors , doctors , setDoctors} = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // false is the initial value
  const [loadingSection, setLoadingSection] = useState(false); // false is the initial value
  const [error, setError] = useState(false); // null is the initial value
  const [searchInput, setSearchInput] = useState('');
  const [reviews, setReviews] = useState([]);
  
  // Filter doctors based on the search input
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllDoctors();
        if(response.status === 200){
          setDoctors(response.data);
          setLoading(false);
        }else{
          setLoading(false);
          setError(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
      fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        setLoadingSection(true);
        const response = await axios.get('/api/v1/doctors/reviews/all' , {
          validateStatus : false
        });
        if(response.status === 200){
          setLoadingSection(false);
          setReviews(response.data.data.reviews);
        }else{
          setLoadingSection(false);
          setError(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchAllReviews();
  }, []);

  if(loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <ClipLoader color="#3D83FF" size={150} />
    </div>
  )

  if(error) return (
    <div className="flex justify-center items-center h-[60vh]">
      <BiError className="text-5xl text-red-500" />
    </div>
  )

  return (
    <>
      {/* Create search bar */}
      <div className="container">
        <h1 className="text-2xl text-red-500 font-bold mt-[30px] lg:mt-[55px] text-center">
          Api Booking is not working 100% right now
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
                <DoctorsCard key={item._id} item={item} />
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
          <div className='flex justify-center items-center mt-[30px] lg:mt-[55px]'>
            <div className='w-[50px] h-[2px] bg-[#3D83FF]'></div>
          </div>

          {loadingSection && (
            <div className="flex justify-center items-center h-[60vh]">
              <ClipLoader color="#3D83FF" size={150} />
            </div>
          )}
          <Testimonial reviews={reviews} />
        </div>
      </section>
    </>
  );
}

export default Doctors;
