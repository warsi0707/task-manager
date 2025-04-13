import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import LogInput from '../component/LogInput'
import LogButton from '../component/LogButton'
import toast from 'react-hot-toast'
import { BackendUrl } from '../utils/BackendUrl'

export default function Signup() {
  const usernameRef = useRef()
  const passwordref = useRef()
  const confirmPasswordRef = useRef()
  const navigate = useNavigate()


  const Signup =async(e)=>{
    e.preventDefault()
    const username = usernameRef.current.value;
    const password = passwordref.current.value
    const confirmPassword = confirmPasswordRef.current.value
    try{
      const response = await fetch(`${BackendUrl}/user/signup`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, confirmPassword})
      })
      const result = await response.json()
      if(response.ok){
        toast.success(result.message)
        navigate("/signin")
      }else{
        toast.error(result.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }
  return (
    <div className='w-full min-h-screen py-5 mt-20'>
      <div className='  mx-auto py-10 bg-white w-[400px] rounded-md p-8 flex flex-col gap-10'>
        <h1 className='mx-auto text-3xl'>Register</h1>
        <div className='flex flex-col gap-4'>
         <LogInput refs={usernameRef} type={'text'} label={'Username'} placeholder={'Username'}/>
         <LogInput refs={passwordref} type={'password'} label={'Password:'} placeholder={'password'}/>
         <LogInput refs={confirmPasswordRef} type={'password'} label={'Confirm Password:'} placeholder={'password'}/>
          <div>
            <p>Already a user? <Link className='text-blue-600'>Signin</Link></p>
          </div>
          <LogButton onclick={Signup} title={"Register"}/>
        </div>
        
      </div>
    </div>
  )
}
