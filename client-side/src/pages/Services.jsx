import React from 'react'
import ServicesCard from '../components/Services/ServicesCard'
import {services} from "./../assets/data/services"

function Services() {
  return (
    <section className='p-0'>
      <div className="container">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
            {services.map((item, index) => (
                <ServicesCard key={index} item={item} index={index} />
            ))}
          </div>
      </div>
    </section>
  )
}

export default Services