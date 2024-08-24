import React from 'react'
import { SignIn } from '@clerk/nextjs'
const Page = () => {
  return (
    <div className="w-full flex justify-center items-center h-[calc(100vh-96px)]">

    <SignIn signUpUrl='/sign-up'/>
    </div>
  )
}

export default Page