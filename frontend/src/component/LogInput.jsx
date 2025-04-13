import React, { memo } from 'react'

function LogInput({type, placeholder, label,refs}) {
  return (
    <div className='flex flex-col'> 
    <label htmlFor="">{label}</label>
    <input ref={refs} type={type} placeholder={placeholder} className='p-3 border border-gray-500 '/>
  </div>
  )
}
export default  memo(LogInput)