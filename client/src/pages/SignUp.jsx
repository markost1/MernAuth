
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearError, signInSuccess, signUpFailure, signUpStart } from '../redux/user/userSlice.js'

export default function SignUp() {

  const [formData, setFormData] = useState({})
  const {loading,error} = useSelector((state)=> state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  




const handleChange = (e) =>{
  setFormData({
  ...formData,
  [e.target.id] : e.target.value
 });
  if (error) dispatch(clearError());
};

console.log(formData);

const handleSubmit = async(e) =>{
  e.preventDefault();

  //frontend validation

  if(!formData.username || !formData.email || !formData.password){
    dispatch(signUpFailure('All fields are required'))
    return
  }

  dispatch(signUpStart())
  try {
    const res = await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })

    const data = await res.json()

    if (data.success === false) {
      dispatch(signUpFailure(data.message || 'Something went wrong'))
      return;
    }else{
      dispatch(signInSuccess(data))
      navigate('/signin')
    }

    
    console.log(data)
  } catch (error) {
    dispatch(signUpFailure(error.message))
    
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
            <button disabled={loading} className='p-3 border rounded-lg bg-gray-600 text-white uppercase hover:opacity-90 '>
            {loading ? 'Loading...' : 'Register Now'}
            </button>
        </form>
        <div className='my-5 flex gap-5'>
            <span className='text-gray-600'>Already have an account?</span>
            <Link to='/signin'>
            <span className='font-semibold cursor-pointer hover:underline text-gray-600'>Sign In</span>
            </Link>
        </div>
        {error && <p className= 'text-red-400 text-sm'>{error}</p>}
    </div>
    </div>
  )
}
