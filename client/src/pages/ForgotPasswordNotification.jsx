import { Link } from "react-router-dom";


export default function ForgotPasswordNotification() {
  return (
    <div className="w-full h-[calc(100vh-140px)] flex justify-center items-center">
        <div className="w-full max-w-sm min-w-[280px] bg-white p-6 rounded-xl shadow-md text-center">
            <h1 className="p-3">Welcome Back!</h1>
            <p className="my-4">Please check your email <br/>
            If your email is registered, a password reset link has been sent.</p>
            
            <div className="flex flex-row p-3 items-center justify-center mt-3 gap-3">
                 <Link to={"/signin"} className="w-full text-sm text-center my-7
                 text-gray 600 bg-clip-text hover:underline">
                  <p>{'<- '}  Back To Login</p> 
                 </Link>
            </div>
    </div>
    </div>
  )
}
 