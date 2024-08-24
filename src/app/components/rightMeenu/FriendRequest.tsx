import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/client'
import FriendRequestList from './FriendRequestList'

const FriendRequest = async() => {

  const {userId} = auth()

  if(!userId){
    return null
  }

  const res = await prisma.followRequest.findMany({
    where:{
        receiverId:userId
    },
    include:{
        sender:true
    }

  })


  return (
    <div className='p-4 bg-white  rounded-lg shadow-md text-sm flex flex-col gap-4'>
        {/* TOP  */}
        <div className="flex justify-between items-center font-medium">
            <span className='text-gray-500'>Friend Request</span>
            <Link href="/" className='text-blue-500'>See all</Link>
        </div>

       <FriendRequestList res={res}/>
    

    </div>
  )
}

export default FriendRequest