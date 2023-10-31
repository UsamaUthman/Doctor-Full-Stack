import React, { useState } from 'react'

function FaqItem({item , index}) {

  const [show , setShow] = useState(false)

  const {question , content} = item

  const handleShow = () => {
    setShow(!show)
  }
  return (
    <li className='mb-[20px]'>
        <div className='flex justify-between items-center'>
            <h3 className='text-[#333] text-[20px] font-bold cursor-pointer' onClick={handleShow}>{question}</h3>
            <button onClick={handleShow} className='text-[#333] text-[28px] font-bold'>{show ? '-' : '+'}</button>
        </div>
        {show && <p className='text-[#333] text-[18px] font-bold mt-[10px]'>{content}</p>}
    </li>
  )
}

export default FaqItem