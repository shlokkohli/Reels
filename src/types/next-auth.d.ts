import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface User {
        _id: string
    }

    interface Session {
        user: {
            _id?: String
        } & DefaultSession['user'] // this default session means that i want all the user object properties that are already there
    }                              // in nextjs, like name, email, etc, and now i want to overlap those properties with a new
}                                  // property that i declared, which is _id here in this case