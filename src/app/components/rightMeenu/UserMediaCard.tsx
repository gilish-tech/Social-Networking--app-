import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User } from '@prisma/client'
import prisma from '@/lib/client'

const UserMediaCard = async({user}:{user:User}) => {

  const postWithMedia = await prisma.post.findMany({
   where:{
      userId:user.id!,
      img:{
         not:null
      }
   },
   take:8,
   orderBy:{
      createdAt:"desc"
   } 
  })

  return (
    <div className='p-4 bg-white  rounded-lg shadow-md text-sm flex flex-col gap-4'>
    {/* TOP  */}
    <div className="flex justify-between items-center font-medium">
        <span className='text-gray-500'>User Media</span>
        <Link href="/" className='text-blue-500'>See all</Link>
    </div>

    {/* BOTTOM  */}

    <div className="flex gap-4 justify-between flex-wrap">
        {
         postWithMedia.length  ? postWithMedia.map((item,index)=>(
            <div className="relative w-1/5 h-24" key={index}>
               <Image src={item.img!} alt='' fill className='object-cover rounded-md' />
            </div>

         )):
         <p className='text-xl'>No media Found</p>
        }
        
 
    </div>

   

    </div>
  )
}

export default UserMediaCard