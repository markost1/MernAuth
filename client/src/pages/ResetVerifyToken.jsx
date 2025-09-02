import { useState } from "react"
import { useNavigate } from "react-router-dom"



export default function ResetVerifyToken() {
const [formData,setFormData] = useState({})
const navigate = useNavigate()

const handleChange = (e) =>{
  setFormData({
     [e.target.id]:e.target.value
  })
}

const handleSubmit = async(e) =>{
   e.preventDefault()
   try {
      const res = await fetch('/api/auth/resend-token',{
         method:'POST',
         headers:{
            'Content-Type':'application/json'
         },
         body:JSON.stringify(formData)
      })
      
      const data = await res.json()
      navigate('/vertification')
      console.log(data);
      
      
   } catch (error) {
      console.log(error);
      
   }
}

  return (
   <div className=' w-full h-[calc(100vh-140px)] flex justify-center items-center'>
        <div className='w-full max-w-sm min-w-[280px] bg-white p-6 rounded-xl shadow-md'>
           <h2  className='text-center p-2'>Reset Verify Token</h2>
            <p className="text-center text-gray-700 text-sm p-2">
            Enter your email address and we &apos;ll send you a link to verify your Email
            </p>


            <form onSubmit={handleSubmit}  className='flex flex-col gap-4'>
                <input type='email' onChange={handleChange} placeholder='Enter Email Address' id='email' className='border rounded-xl border-gray-700 p-3 focus:border-gray-500 focus:ring-2
                    focus:ring-gray-500'/>
                <button className='p-3 rounded-xl bg-gray-700 text-white uppercase hover:opacity-90'>Resend Verification Link</button>
            </form>
              
        </div>
      
    </div>
  )
}
