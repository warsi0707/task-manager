import React from 'react'
import { Link } from 'react-router'
import LogInput from '../component/LogInput'
import LogButton from '../component/LogButton'

export default function Signup() {
  return (
    <div className='w-full min-h-screen py-5 bg-blue-400'>
      <div className='  mx-auto py-10 bg-white w-[400px] rounded-md p-8 flex flex-col gap-10'>
        <h1 className='mx-auto text-3xl'>Register</h1>
        <div className='flex flex-col gap-4'>
         <LogInput type={'text'} label={'Username'} placeholder={'Username'}/>
         <LogInput type={'password'} label={'Password:'} placeholder={'password'}/>
          <div>
            <p>Already a user? <Link className='text-blue-600'>Signin</Link></p>
          </div>
          <LogButton title={"Register"}/>
        </div>
        
      </div>
    </div>
  )
}
