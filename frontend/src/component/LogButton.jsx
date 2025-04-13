import React, { memo } from 'react'

 function LogButton({title}) {
  return (
    <button className='w-full py-3 text-xl text-white bg-blue-400'>{title}</button>
  )
}
export default memo(LogButton)