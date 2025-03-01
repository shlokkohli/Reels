'use client'
import { useRouter } from "next/navigation";
import { useState } from "react"
import axios from 'axios'
import Link from "next/link";

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState<string | null>("")

    const router = useRouter()

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {

      e.preventDefault();
      if(password !== confirmPassword){
        setError("Your password does not match")
      }

      try {

        const response = await axios.post('/api/auth/register', {
          email, password
        })
        
      } catch (error) {
        
      }

    }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>

        <p>
          Already have an account?{" "}
          <Link href='/login' className='text-blue-500 hover:text-blue-600'>
            Login
          </Link>
        </p>

      </form>
    </div>
  )
}

export default Register
