import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignIn() {

  const [formData, setFormData] = useState({});

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = async(e) =>{
      e.preventDefault();
      try {
        const res = await fetch('/api/auth/signin',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(formData)
        })

        const data = await res.json();
        console.log(data);
        
        if(data.success === false){
          console.log(data.message);
          
        }else{
          console.log('User is successfully loged in');
          
        }
        
      } catch (error) {
        console.log(error.message);
        
      }
  }

  console.log(formData);
  


  return (
    <div className='w-screen h-[calc(100vh-140px)]'>
    <div className='max-w-xl mx-auto p-3  '>
        <h1 className='my-7 text-center text-gray-600 text-l font-semibold '>Log in page </h1>
        <form  onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <input type='email' placeholder='Email' id='email' onChange={handleChange} className='p-3 border border-gray-400 rounded-lg'/>
            <input type='password' placeholder='Password' id='password' onChange={handleChange} className='p-3 border border-gray-400 rounded-lg'/>
            <button className='p-3 border rounded-lg bg-gray-600 text-white uppercase hover:opacity-90 '>Log In</button>
        </form>
        <div className='my-5 flex flex-col gap-3'>
        
        <Link to='/forgot-password'>
            <span className='font-semibold cursor-pointer hover:underline text-gray-600'> Forgot password?</span>
        </Link>
        
        <Link to='/signup'>
            <span className='font-semibold cursor-pointer hover:underline text-gray-600'>
               Don’t have an account? Sign Up
            </span>
        </Link>
        </div>
    </div>
    </div>
  )
}