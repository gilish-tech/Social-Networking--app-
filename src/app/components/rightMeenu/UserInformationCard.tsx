import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/client'
import UserInfoCardInteration from './UserInfoCardInteration'
import UpdateUser from './UpdateUser'


const UserInformationCard = async ({user}:{user:User}) => {
  const {createdAt} = user
  const formattedDate = createdAt.toLocaleDateString("en-us",{
    year:"numeric",
    month:"long",
    day:"numeric"
  })

   let isFollowing = false
   let isBlock = false
   let isFollowingRequestSent= false

   const {userId:currentUserId} = auth()

   if (currentUserId){
    const blockRes = await prisma.block.findFirst({
      where:{
        blockedId:currentUserId,
        blockerId:user.id
        
      }

    })
    blockRes ? (isBlock = true) : (isBlock = false)
    
    
    if(!isBlock){
        const folRes = await prisma.follower.findFirst({
          where:{
            followerId:currentUserId,
            followingId:user.id
            
          }
    
        })
        folRes ? (isFollowing = true) : (isFollowing = false)
      
    }

    if(!isBlock || isFollowing){
        const folRes = await prisma.followRequest.findFirst({
          where:{
            senderId:currentUserId,
            receiverId:user.id
            
          }
    
        })
        folRes ? (isFollowingRequestSent = true) : (isFollowingRequestSent = false)
      
    }


   }






  return (
    <div className='p-4 bg-white  rounded-lg shadow-md text-sm flex flex-col gap-4'>
    {/* TOP  */}
    <div className="flex justify-between items-center font-medium">
        <span className='text-gray-500'>User Information</span>

        {currentUserId == user.id ? (<UpdateUser user={user}/>) : (<Link href="/" className='text-blue-500'>See all</Link>)}
    </div>

    {/* BOTTOM  */}
    <div className="flex flex-col gap-4 text-gray-500">
      <div className="flex items-center gap-2">
        <span className='text-xl'>{user.name || user.surnname? user.name +" " + user.surnname : user.username}</span>
        <span className='text-sm'>@{user.username}</span>
      </div>


      {
        user.description &&(

          <p className='leading-normal'>{user.description}</p>
        )
      }


      {
        user.city &&(
          <div className="flex gap-2">
            <Image src="/map.png" alt='' width={16} height={16}/>
            <span>living in <b>{user.city}</b></span>
          </div>

        )
      }
      {
        user.school &&(
          <div className="flex gap-2">
            <Image src="/school.png" alt='' width={16} height={16}/>
            <span>Went to <b>{user.school}</b></span>
        </div>

        )
      }
      {
        user.work &&(
        
        <div className="flex gap-2">
          <Image src="/work.png" alt='' width={16} height={16}/>
          <span>Works At <b>{user.work}</b></span>
        </div>

        )
      }
      <div className="flex items-center justify-between">
      {
        user.website &&(
        
           <div className="flex gap-2 items-center">
              <Image src="/link.png" alt='' width={16} height={16}/>
              <Link href={user.website}
              className='font-medium text-blue-500'>{user.username}</Link>
           </div>
       

        )
      }

      <div className="flex gap-2 items-center">
        <Image src="/date.png" alt='' width={16} height={16}/>
        <span className='font-medium'>Joined  {formattedDate}</span>
      </div>
      </div>
      {
        currentUserId && currentUserId !== user.id &&(

          <UserInfoCardInteration 
           userId={user.id}
           isBlock={isBlock}
           isFollowing={isFollowing}
           isFollowingRequestSent={isFollowingRequestSent}
            />
        )
      }
    </div>

   

    </div>
  )
}

export default UserInformationCard