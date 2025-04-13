import React, { memo } from 'react'

 function AddTaskInput({label,placeholder}) {
  return (
    <div className="flex flex-col">
            <label htmlFor="">{label}</label>
            <input type="text" placeholder={placeholder} className="p-3 border border-slate-400"/>
          </div>
  )
}
export default memo(AddTaskInput)