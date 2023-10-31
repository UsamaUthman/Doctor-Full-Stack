import React, { useState } from 'react'
import doctorImg from './../../assets/images/doctor-img01.png'
import About from './About'
import { formateDate } from '../../utils/formateDate'
import SidePanel from './SidePanel'

function DoctorDetails() {
  const [tap , setTap] = useState(0)
  const [showfeedbackForm , setshowFeedbackForm] = useState(false)
  const feedbackData = [
    {
      id: 1,
      name: 'John Doe',
      date: '2014-01-01',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatem, voluptatum, repellendus, voluptate.',
    },
    {
      id: 2,
      name: 'John Doe',
      date: '2017-01-01',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. quia dolorum voluptas quas quod quibusdam natus doloribus.',
    },
    {
      id: 3,
      name: 'John Doe',
      date: '2019-01-01',
      text: 'Quisquam voluptatem, voluptatum, repellendus, voluptate quia dolorum voluptas quas quod quibusdam natus doloribus.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className='grid md:grid-cols-3 gap-[50px]'>
          <div className='md:col-span-2'>
            <div className='flex flex-col xl:flex-row items-center gap-5'>
              <img className='h-[300px] w-[300px] block self-start' src={doctorImg} alt='' />
              <div>
                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                  Surgeon
                </span>
                <h2 className='text-2xl font-bold mt-4'>Dr. Samantha Smith</h2>
                <div className='flex items-center gap-[6px]'>
                  <span className='text-[#FFB800]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M10 1a9 9 0 100 18 9 9 0 000-18zM8.293 9.293a1 1 0 011.414 0L10 10.586l1.293-1.293a1 1 0 111.414 1.414L11.414 12l1.293 1.293a1 1 0 01-1.414 1.414L10 13.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 12 7.293 10.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                  <span className='text-sm text-irisBlueColor'>
                    4.5 (3,000 patients)
                  </span>
                </div>
             
                <p className='text-sm text-textColor mt-4'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatem, voluptatum, repellendus, voluptate quia
                  dolorum voluptas quas quod quibusdam natus doloribus.
                </p>
              </div>
            </div>
            <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
              <div className='flex items-center justify-between'>
                <button className='text-irisBlueColor font-semibold text-[16px] leading-7' onClick={()=>{
                  setTap(0)
                }}>
                  About
                </button>
                <button className='text-irisBlueColor font-semibold text-[16px] leading-7' onClick={()=>{
                  setTap(1)
                }}>
                  Education
                </button>
                <button className='text-irisBlueColor font-semibold text-[16px] leading-7' onClick={()=>{
                  setTap(2)
                }}>
                  Feedback
                </button>
              </div>
            </div>
            <div className='mt-[50px]'>
              {tap === 0 && (
                <About />
                )}
              {tap === 1 && (
                  <div className='mt-[20px]'>
                    <h1 className='text-2xl font-bold'>Education</h1>
                    <ul className='pt-4 md:p-5'>
                      <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[20px]'>
                        <div className='flex items-center gap-5'>
                          <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                            {formateDate("2014-01-01")}
                          </span>
                          <div>
                            <h2 className='text-lg font-bold'>Master Dgree</h2>
                            {/* university of california */}
                            <p className='text-textColor text-sm mt-1'>
                              University of California
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                        <div className='flex items-center gap-5'>
                          <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                            {formateDate("2010-01-01")}
                          </span>
                          <div>
                            <h2 className='text-lg font-bold'>Master Dgree</h2>
                            <p className='text-textColor text-sm mt-1'>
                              University of California
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                </div>
                )}
              {tap === 2 && (
                  <div className='mt-[20px]'>
                    <h1 className='text-2xl font-bold'>Feedback</h1>
                    {feedbackData.map((item) => (
                      <div className='flex items-center gap-5 mt-[20px]' key={item.id}>
                        <img
                          className='h-[50px] w-[50px] rounded-full self-start'
                          src={doctorImg}
                          alt=''
                        />
                        <div>
                          <h2 className='text-lg font-bold'>{item.name}</h2>
                          <span>
                            {formateDate(item.date)}
                          </span>
                          <p className='text-textColor text-sm mt-1 p-3 bg-[#f7f7f7] rounded-lg shadow-md'>
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className='mt-[20px] flex items-center justify-center'>
                      <button className='bg-[#3D83FF] text-white rounded-md px-5 py-2' onClick={()=>{
                        setshowFeedbackForm(!showfeedbackForm)
                      }}>Add Feedback</button>
                    </div>
                    <form onSubmit={handleSubmit} className={`${showfeedbackForm ? 'block' : 'hidden'} mt-[20px]`}>
                      <div className='flex items-center gap-5'>
                        <img
                          className='h-[50px] w-[50px] rounded-full self-start'
                          src={doctorImg}
                          alt=''
                        />
                        <div>
                          <h2 className='text-lg font-bold'>John Doe</h2>
                          <span>
                            {formateDate(new Date())}
                          </span>
                          <textarea
                            className='w-full border-2 border-gray-300 rounded-md p-2 mt-2'
                            placeholder='Type your feedback here...'
                            rows='4'
                          />
                          <div className='mt-2'>
                            <button className='bg-[#3D83FF] text-white rounded-md px-5 py-2'>Submit</button>
                            <button className='bg-[#3D83FF] text-white rounded-md px-5 py-2 ml-2' onClick={()=>{
                              setshowFeedbackForm(false)
                            }}>Cancel</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
            </div>
          </div>

          <div>
            <SidePanel />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DoctorDetails