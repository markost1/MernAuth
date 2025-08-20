import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
        <div class="grid grid-cols-2 h-screen">
        <div class="p-4 text-center ">
            <h1>Hello and Welcome!</h1>
            <h2>This is a MERN stack user authentication app.</h2>
           
            <div className="flex flex-col">

            <span>Sign up and log in with JWT authentication</span>
            <span>Reset your password if you forget it</span>
            <span>Secure sign out and account deletion</span>
                
            </div>
        </div>
        <div class="p-4">
            Content of the second div.
        </div>
    </div>
    </div>
  )
}
