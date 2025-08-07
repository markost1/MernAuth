import React from 'react'
import { Link } from 'react-router-dom'

export default function SignIn() {
  return (
    <div className='w-screen h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
    <div className='max-w-xl mx-auto p-3  '>
        <h1 className='my-7 text-center text-white text-3xl font-semibold'>Log in to MernAuth</h1>
        <form className='flex flex-col gap-5'>
            <input type='email' placeholder='Email' id='email' className='p-3 border rounded-lg'/>
            <input type='password' placeholder='Password' id='password' className='p-3 border rounded-lg'/>
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