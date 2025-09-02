import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function VertificationPage() {

const [code,setCode] = useState({})
const [error,setError] = useState(null)
const navigate = useNavigate()

const handleChange = (e) =>{
  setCode({
    [e.target.id] : e.target.value
  }
  )
}
console.log(code);

const handleSubmit = async(e) =>{
  e.preventDefault();
  try {
    const res = await fetch('/api/auth/verify-email',{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify(code)
    })

    const data = await res.json();
    if (data.success === false){
      console.log(data.message);
      setError(data.message)
      return;
      
    }else{
          console.log(data);
    navigate('/profile')
    }



    
    
  } catch (error) {
    console.log(error.message);
    
  }
}


  return (
    <div className="w-screen h-[calc(100vh-140px)] flex flex-col justify-center items-center gap-4">
        <h1>Verify Your Email</h1>
        <p className="text-center break-words sm:text-base">Enter 6-digits code send on your email address</p>
        <form  onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input className="border p-3 rounded-lg border-gray-700" type="password" placeholder="Your Vertification Token..." id="code" onChange={handleChange}/>
            <button className="p-3 border rounded-lg bg-gray-700 uppercase text-white hover:opacity-85">Verify Email</button>
        </form>
        {error && <div className="w-screen flex flex-col justify-center items-center gap-2">
            <p className="text-sm text-red-400 my-2 break-words">{error}</p>
            <Link to={'/resend-token'}>
               <span className="text-sm font-bold text-red-400 my-2 break-words">
                   Resend Email
                </span>
            </Link>
        </div>}
    </div>
  )
}
