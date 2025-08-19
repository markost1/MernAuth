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
    <div className='w-screen h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
    <div className='max-w-xl mx-auto p-3  '>
        <h1 className='my-7 text-center text-white text-3xl font-semibold'>Log in to MernAuth</h1>
        <form  onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <input type='email' placeholder='Email' id='email' onChange={handleChange} className='p-3 border rounded-lg'/>
            <input type='password' placeholder='Password' id='password' onChange={handleChange} className='p-3 border rounded-lg'/>
            <button className='p-3 border rounded-lg bg-blue-500 text-white uppercase hover:opacity-90 '>Log In</button>
        </form>
        <div className='my-5 flex gap-5'>
            <span className='text-gray-900'>Forgotten account?</span>
            <Link to='/signup'>
            <span className='font-semibold cursor-pointer hover:underline text-white'>Sign Up</span>
            </Link>
        </div>
    </div>
    </div>
  )
}