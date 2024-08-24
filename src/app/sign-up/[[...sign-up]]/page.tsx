import React from 'react'
import { SignUp } from '@clerk/nextjs'
const Page = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-96px)]">
        <SignUp signInUrl='/sign-in'/>
    </div>
  )
}

export default Page