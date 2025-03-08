'use client'
import { Home, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

function Header() {

    const { data: session } = useSession();
    
    const handleSignout = async () => {
        try {
            await signOut();
        } catch (error) {
            
        }
    }

  return (
    <div className="bg-[#1a1d23] py-3 sticky top-0 z-40 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex-1 px-2 lg:flex-none">

            <Link
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

              </div>

            </div>

          </div>

        </div>
    </div>
  )
}

export default Header
