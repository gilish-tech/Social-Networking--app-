import React from 'react'
import Image from 'next/image'
import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'

const ProfileCard = async () => {

  const {userId} = auth()
  if (!userId){
    return null
  }
  const user = await prisma.user.findFirst({

    where:{

      id:userId

    },
    include:{
      _count:{
        select:{
          follower:true
        }
      }
    }
  })

  
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex-col gap-6'>
        <div className="h-20 relative">
            <Image src={user?.cover || ""} alt='' fill className='rounded-md  object-cover'/>
            <Image src={user?.avatar || ""} alt='' width={48} height={48} className='object-cover rounded-full absolute left-0 right-0 w-12 h-12 z-50 top-0 m-auto -bottom-12
             ring-1 ring-white shadow-sm shadow-gray-300'/>
        </div>

        <div className="h-20  flex flex-col gap-2 items-center">
            <span className='font-semibold'>{user?.name && user?.surnname ? user.name + user.surnname : user?.username}</span>
            <div className="flex items-center gap-4">

                <div className="flex">
                    <Image src="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600" alt='' width={48} height={48} className='object-cover rounded-full w-2 h-3'/>
                    <Image src="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600" alt='' width={48} height={48} className='object-cover rounded-full w-2 h-3'/>
                    <Image src="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600" alt='' width={48} height={48} className='object-cover rounded-full w-2 h-3'/>
                </div>
                <span className='text-xs text-gray-500'>{user?._count.follower} followers</span>
            </div>
             <button className='bg-blue-500 text-white text-xs p-2 rounded-md'>My Profile</button>
        </div>

    </div>
  )
}

export default ProfileCard