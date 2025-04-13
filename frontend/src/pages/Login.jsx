import React, { memo, useContext, useRef } from 'react'
import LogInput from '../component/LogInput'
import { Link, useNavigate } from 'react-router'
import LogButton from '../component/LogButton'
import toast from 'react-hot-toast'
import { BackendUrl } from '../utils/BackendUrl'
import AuthContext from '../context/AuthContext'

 function Login() {
  const usernameRef = useRef()
  const passwordref = useRef()
  const navigate = useNavigate()
  const {setAuthenticated} = useContext(AuthContext)
  const Login =async(e)=>{
    e.preventDefault()
    const username = usernameRef.current.value;
    const password = passwordref.current.value
    try{
      const response = await fetch(`${BackendUrl}/user/signin`,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({username, password}) 
      })
      const result = await response.json()
      if(response.ok){
        setAuthenticated(true)
        navigate("/")
        toast.success(result.message)
      }else{
        setAuthenticated(false)
        toast.error("Please wait")
      }

    }catch(error){
      toast.error(error.message)
    }
  }
  return (
    <div className='w-full min-h-screen py-5 mt-20'>
    <div className='  mx-auto py-10 bg-white w-[400px] rounded-md p-8 flex flex-col gap-10'>
      <h1 className='mx-auto text-3xl'>Login</h1>
      <div className='flex flex-col gap-4'>
       <LogInput refs={usernameRef} type={'text'} label={'Username'} placeholder={'Username'}/>
       <LogInput refs={passwordref} type={'password'} label={'Password:'} placeholder={'password'}/>
        <div>
          <p>Dont't have an account? <Link className='text-blue-600'>Register</Link></p>
        </div>
        <LogButton onclick={Login} title={"Sign In"}/>
      </div>
      
    </div>
  </div>
  )
}
export default memo(Login)