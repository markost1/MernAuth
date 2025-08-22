import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>

            <header className="shadow-md">
        <div className="flex justify-between items-center max-w-6xl p-6 mx-auto">
            <h1 className='text-xl font-semibold'>
            <Link to='/'>
                <span>Mern</span>
                <span>Auth</span>
            </Link>
                
            </h1>
         
        </div>
    </header>
    </div>
  )
}

