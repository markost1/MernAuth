import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="p-5 shadow-[0_-4px_6px_-4px_rgba(0,0,0,0.3)]">
       <div className="flex flex-col justify-center items-center text-xs font-semibold p-1 md:flex-row gap-3">
          <p>© Copyright {new Date().getFullYear()} MERN Auth App. </p> <span className="text-gray-400">Made with ❤️ by <Link to='https://prentindo.com/'>Prentindo tehnology</Link></span>
        </div>
    </footer>
  )
}
