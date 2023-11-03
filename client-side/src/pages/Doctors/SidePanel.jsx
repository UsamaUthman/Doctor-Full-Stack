import React from 'react'

function SidePanel({doctor}) {

    const {timeSlots} =  doctor

    // time slots is showing like this in the database object contains a day and contains a array of timesSlots

    // {
    //     day: "Monday",
    //     slots: [
    //       { startTime: "09:00", endTime: "10:00" },
    //       { startTime: "10:00", endTime: "11:00" },
    //       { startTime: "11:00", endTime: "12:00" },
    //       { startTime: "12:00", endTime: "13:00" },
    //       { startTime: "13:00", endTime: "14:00" },
    //     ],
    //   },
    //   {
    //     day: "Tuesday",
    //     slots: [
    //       { startTime: "09:00", endTime: "10:00" },
    //       { startTime: "10:00", endTime: "11:00" },
    //       { startTime: "11:00", endTime: "12:00" },
    //       { startTime: "12:00", endTime: "13:00" },
    //       { startTime: "13:00", endTime: "14:00" },
    //     ],
    //   },
    //   {
    //     day: "Wednesday",
    //     slots: [
    //       { startTime: "09:00", endTime: "10:00" },
    //       { startTime: "10:00", endTime: "11:00" },
    //     ],
    //   },
  return (
    <div className='shadow-lg p-3 lg:p-5 rounded-md '>
        <div className='flex items-center justify-between'>
            <p className='text__para mt-0 font-semibold'>
                ticket price 
            </p>
            <p className='text__para mt-0 font-semibold'>
                {doctor?.ticketPrice}
            </p>
        </div>

        <div className='mt-[30px]'>
            <p className='text__para mt-0 font-bold'>
                <span className='text-green-400'>Available</span> times Slots:
            </p>

            <ul className='mt-3 space-y-4'>
                {timeSlots?.map((item, index) => (
                    <li className='flex  justify-between gap-4' key={index}>
                        <p className='text__para mt-0 font-semibold'>
                            {item?.day}
                        </p>
                        <p className='text__para mt-0 font-semibold flex flex-col gap-2'>
                            {item?.slots?.map((slot, index) => (
                                <span key={index}>{slot?.startTime} - {slot?.endTime}</span>
                            ))}
                        </p>
                    </li>
                ))}
            </ul>
            <div className='mt-[30px]'>
                <button className='bg-[#3D83FF] text-white rounded-md px-5 py-2 w-full'>Book Appointment</button>
            </div>
        </div>
    </div>
  )
}

export default SidePanel