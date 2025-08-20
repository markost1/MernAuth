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
    <div className='w-screen h-screen'>
    <div className='max-w-xl mx-auto p-3  '>
        <h1 className='my-7 text-center text-gray-600 text-l font-semibold '>Log in page </h1>
        <form  onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <input type='email' placeholder='Email' id='email' onChange={handleChange} className='p-3 border border-gray-400 rounded-lg'/>
            <input type='password' placeholder='Password' id='password' onChange={handleChange} className='p-3 border border-gray-400 rounded-lg'/>
            <button className='p-3 border rounded-lg bg-gray-600 text-white uppercase hover:opacity-90 '>Log In</button>
        </form>
        <div className='my-5 flex gap-5'>
            <span className='text-gray-600'>Forgotten account?</span>
            <Link to='/signup'>
            <span className='font-semibold cursor-pointer hover:underline text-gray-600'>Sign Up</span>
            </Link>
        </div>
    </div>
    </div>
  )
}