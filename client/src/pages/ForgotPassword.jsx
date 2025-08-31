
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function ForgotPassword() {

    const [formData,setFormData] = useState({})
    const navigate = useNavigate()
 
    const handleChange = (e) =>{
        return setFormData({
            [e.target.id]:e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/forgot-password',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            const data = await res.json()
            if(data.success){
                navigate('/forgot-password-notification')
            }
            console.log(data);
            
        } catch (error) {
            console.log(error.message);
            
        }
    }
    

  return (
    <div className=' w-full h-[calc(100vh-140px)] flex justify-center items-center'>
        <div className='w-full max-w-sm min-w-[280px] bg-white p-6 rounded-xl shadow-md'>
           <h2  className='text-center p-2'>Forgot Password</h2>
            <p className="text-center text-gray-700 text-sm p-2">
            Enter your email address and we &apos;ll send you a link to reset your password
            </p>


            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type='email' placeholder='Enter Email Address' id='email' className='border rounded-xl border-gray-700 p-3 focus:border-gray-500 focus:ring-2
         focus:ring-gray-500' onChange={handleChange}/>
                <button className='p-3 rounded-xl bg-gray-700 text-white uppercase hover:opacity-90'>Send Reset Link</button>
            </form>
               <Link to={"/signin"} >
                  <p className="text-center text-sm text-gray-600 hover:underline my-6">{'<- '}  Back To Login</p> 
               </Link>
        </div>
      
    </div>
  )
}
