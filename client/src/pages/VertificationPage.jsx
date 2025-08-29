
export default function VertificationPage() {
  return (
    <div className="w-screen h-[calc(100vh-140px)] flex flex-col justify-center items-center gap-4">
        <h1>Verify Your Email</h1>
        <p className="text-center break-words sm:text-base">Enter 6-digits code send on your email address</p>
        <form className="flex flex-col gap-3">
            <input className="border p-3 rounded-lg border-gray-700" type="password" placeholder="Your Vertification Token..." id="code"/>
            <button className="p-3 border rounded-lg bg-gray-700 uppercase text-white hover:opacity-85">Verify Email</button>
        </form>
    </div>
  )
}
