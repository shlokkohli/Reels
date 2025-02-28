import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    
    function middleware(){
        return NextResponse.next()
    },

    {
        callbacks: {
            authorized: ({ token, req }) => {

                const path = req.nextUrl.pathname

                // authentication related queries
                if(path === '/login' || path === '/register'){
                    return true;
                }

                // public queries
                if(path === '/' || path.startsWith('/api/videos')){
                    return true;
                }

                if(token){
                    return true;
                }
                return false;

            }
        }
    }
)

// this array specifies where should the middleware run
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|public/).*)",
      ],
}