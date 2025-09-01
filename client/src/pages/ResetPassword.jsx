import { useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'

export default function ResetPassword() {
    const [formData, setFormData] = useState({})
    const {token} = useParams()
    const navigate = useNavigate()

    const handleChange = (e) =>{
      return setFormData({
        [e.target.id]:e.target.value
      })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
          const res = await fetch(`/api/auth/reset-password/${token}`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
          })
          const data = await res.json()
         
          if (data.success) {
            setTimeout(()=>{
              navigate('/signin')
            },1500
          )
              
          }
          
        } catch (error) {
            console.log(error.message);
            
        }
    }

    console.log(formData);
    


  return (
    <div className='w-full h-[calc(100vh-140px)] flex justify-center items-center'>
        <div className='w-full max-w-sm min-w-[280px] bg-white p-6 rounded-xl shadow-md'>
            <h1 className='font-bold text-xl text-slate-800 mb-2'>Set a New Password</h1>
            <p className='my-2'>Enter your new password below to securely update your account.</p>
            <p>Make sure it’s strong and unique to keep your account safe.</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 my-3'>
                <input type='password' placeholder='New Password' id='newPassword' onChange={handleChange} className='border border-gray-600 p-3 rounded-lg' />
                <button className='bg-gray-700 rounded-lg text-white uppercase hover:opacity-90 p-3'>Reset Password</button>
            </form>
        </div>
    </div>
  )
}
