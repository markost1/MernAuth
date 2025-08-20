import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {

  const [formData, setFormData] = useState({})


const handleChange = (e) =>{
 return setFormData({
  ...formData,
  [e.target.id] : e.target.value
 })
}

console.log(formData);

const handleSubmit = async(e) =>{
  e.preventDefault();
  try {
    const res = await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })

    const data = await res.json()
    
    console.log(data)
  } catch (error) {
    console.log(error);
    
  }
}



  return (
    <div className='w-screen h-screen'>
    <div className='max-w-xl mx-auto p-4 my-8  '>
        <h1 className='my-7 text-center text-gray-600 text-l font-semibold'>Registration page</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <input type='text' placeholder='Username' id='username' onChange ={handleChange} className='p-3 border border-gray-400 rounded-lg'/>
            <input type='email' placeholder='Email' id='email' onChange={handleChange} className='p-3 border border-gray-400 rounded-lg'/>
            <input type='password' placeholder='Password' id='password' onChange={handleChange} className='p-3 border border-gray-400 rounded-lg'/>
            <button className='p-3 border rounded-lg bg-gray-600 text-white uppercase hover:opacity-90 '>Register Now</button>
        </form>
        <div className='my-5 flex gap-5'>
            <span className='text-gray-600'>Already have an account?</span>
            <Link to='/signin'>
            <span className='font-semibold cursor-pointer hover:underline text-gray-600'>Sign In</span>
            </Link>
        </div>
    </div>
    </div>
  )
}
