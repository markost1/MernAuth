import { Link } from "react-router-dom";
import loginImage from '../assets/Login-amico.svg'
import Footer from "../components/Footer";
export default function Home() {
  return (
    <div
  className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-4"
  style={{ height: "calc(100vh - 80px)" }}
>
  {/* Left side / Text */}
 <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-start gap-4 px-2 sm:px-4 my-10">
  <h1 className="text-slate-800 font-bold text-4xl sm:text-5xl md:text-6xl">
    Hello and Welcome!
  </h1>

  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
    This is a MERN stack user authentication app.
  </h2>

  <div className="flex flex-col gap-2 mt-4 text-base sm:text-lg md:text-base">
    <span>Sign up and log in with JWT authentication.</span>
    <span>Reset your password if you forget it.</span>
    <span>Secure sign out and account deletion.</span>
    <span>Admin panel for managing users and settings.</span>
  </div>

  {/* Dugmad */}
  <div className="flex flex-col sm:flex-row gap-2 mt-6 justify-center md:justify-start">
    <Link to='/signup'>
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
        Sign Up
      </button>
    </Link>
    <Link to='/signin'>
      <button className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition">
        Log In
      </button>
    </Link>
  </div>
</div>


  {/* Right side / Optional */}
 <div className="hidden md:flex md:w-1/2 p-4 text-center items-center justify-center">
  <img src={loginImage} alt="login image" />
</div>



</div>


  )
}

