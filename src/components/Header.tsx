'use client'
import { Home, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

function Header() {

    const { data: session } = useSession();

    const router = useRouter();

    const handleSignOut = async () => {

      try {

        toast.success("Signed out successfully", {
          duration: 1000,
        })

        setTimeout( async () => {
          await signOut();
        }, 500);
        
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="navbar bg-base-300 sticky top-0 z-40">
      <Toaster richColors />
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex-1 px-2 lg:flex-none">

            <Link
              tabIndex={-1}
              href={'/'}
              className="btn btn-ghost text-xl gap-2 normal-case font-bold"
              prefetch={true}
            >
              <Home className="w-5 h-5" />
              Imagekit ReelsPro
            </Link>
          </div>

          <div className="flex flex-1 justify-end px-2">
            <div className="flex items-stretch gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <User2 className="w-5 h-5" />
                </div>

                <ul  className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2">
                  {session ? (
                    <>
                      <li className="px-4 py-1">
                        <span className="text-sm opacity-70">
                          {session.user?.email?.split('@')[0]}
                        </span>
                      </li>

                      <div className="divider my-1"></div>

                      <li>
                        <a
                          tabIndex={0}
                          href='/upload'
                          className="px-4 py-2 hover:bg-base-200 block w-full"
                        >
                          Video Upload
                        </a>
                      </li>

                      <li>
                        <button
                          onClick={handleSignOut}
                          className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
                        >
                          Sign Out
                        </button>
                      </li>

                    </>
                  ) : (
                    <li>
                      <a
                        href='/login'
                        className="px-4 py-2 hover:bg-base-200 block w-full"
                      >
                        Login
                      </a>
                    </li>
                  )
                }
                </ul>

              </div>

            </div>

          </div>

        </div>
    </div>
  )
}

export default Header
