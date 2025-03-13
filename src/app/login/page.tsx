'use client'
import { loginSchema } from '@/schema/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner';
import { z } from 'zod';

function Login() {

    interface ErrorResponse {
        erorr: string
    }

    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const router = useRouter();

    const handleUserLogin = async (data: z.infer<typeof loginSchema>) => {

        setIsSubmitting(true)

        try {

            const response = await signIn('login', {
                redirect: false,
                email: data.email,
                password: data.password
            })

            if(response?.error){
                toast.error(response?.error)
            } else {
                toast.success("Login successful!", {
                    duration: 1000,
                })
                router.push('/')
            }
            
        } catch (error) {

            console.log("Unexpected Error", error)
            
        } finally {
            setIsSubmitting(false);
        }

    }

  return (
    <div className='max-w-md mx-auto'>
        <Toaster richColors />
        <h1 className='text-2xl font-bold mb-4'>Login</h1>

        <form onSubmit={form.handleSubmit(handleUserLogin)} className='space-y-4'>

            {/* email input */}
            <div>
                <label htmlFor="email" className='block mb-1'>
                    Email
                </label>
                <input
                    id='email'
                    type='email'
                    className='w-full px-3 py-2 border rounded'
                    {...form.register('email')}
                />
                {form.formState.errors.email && (
                    <p className='text-red-500 text-sm'>{form.formState.errors.email?.message}</p>
                )}
            </div>

            {/* password input */}
            <div>
                <label htmlFor="password">
                    Password
                </label>
                <input
                    id='password'
                    type='password'
                    className='w-full px-3 py-2 border rounded'
                    {...form.register('password')}
                />
                {form.formState.errors.password && (
                    <p className='text-red-500 text-sm'>{form.formState.errors.password.message}</p>
                )}
            </div>

            <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                    <Loader2 className='h-4 w-4 animate-spin' />
                    <span>Please wait</span>
                    </>
                ) : (
                    'Login'
                )}
            </button>

            <p className='text-center mt-4'>
                Don&apos;t have an account?{" "}
                <Link href='/login' className='text-blue-500 hover:text-blue-600'>
                    Register
                </Link>
            </p>

        </form>

    </div>
  )
}

export default Login