'use client'
import { useRouter } from "next/navigation";
import { useState } from "react"
import axios, { AxiosError } from 'axios'
import Link from "next/link";
import { signUpSchema } from "@/schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from 'react-hook-form'
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"

function Register() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  interface ErrorResponse {
    error : string
  }
  
  const handleUserRegistration = async (data: z.infer<typeof signUpSchema>) => {

    setIsSubmitting(true)

    try {

      const response = await axios.post('/api/auth/register', data)
      
      router.push('/login')
      
    } catch (error) {

      const axiosError = error as AxiosError<ErrorResponse>
      const errorMessage = axiosError.response?.data?.error
      toast("Registration Failed", {
        description: errorMessage
      })

    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={form.handleSubmit(handleUserRegistration)} className="space-y-4">

        {/* email input */}
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded"
            {...form.register('email')}
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
          )}
        </div>

        {/* password input */}
        <div>
          <label htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded"
            {...form.register('password')}
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
          )}
        </div>

        {/* confirm password */}
        <div>
          <label htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full px-3 py-2 border rounded"
            {...form.register('confirmPassword')}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-red-500 text-sm">{form.formState.errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Please wait</span>
          </>
          ) : (
            'Register'
          )}
          </button>


        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href='/login' className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </p>

      </form>

    </div>
  )
}

export default Register
