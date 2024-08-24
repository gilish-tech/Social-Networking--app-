import React from 'react'
import Feed from '@/app/components/feed/Feed'
import LeftMenu from '@/app/components/leftMenu/LeftMenu'
import RightMenu from '@/app/components/rightMeenu/RightMenu'
import Image from 'next/image'
import prisma from '@/lib/client'
import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

const ProfilePage = async ({params}:{params:{username:string}}) => {

  const username = params.username

  const user = await prisma.user.findFirst({

    where:{

      username:username

    },
    include:{
      _count:{
        select:{
          follower:true,
          following:true,
          posts:true,
        }
      }
    }
  })

  if (!user){
    return notFound();
  }

  console.log(user)
  
  let isBlock;
  const {userId:currentUserId} = auth()
  if (currentUserId){
      const res = await prisma.block.findFirst({
      where:{
        blockerId:user.id,
        blockedId:currentUserId
      }
      })

      if(res) isBlock = true;
      else{
        isBlock = false
      }

  }

  if(isBlock) return notFound()


  return (
    <div className='flex gap-6 xl:px-5'>
       <div className="hidden xl:block w-[20%]">
          <LeftMenu type='profile'/>
        </div>

       <div className="w-full lg:w-[70%] xl:w-[50%]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center">
              <div className="w-full h-64 relative">
                <Image src={user.cover || "/noCover.png"} alt="" fill 
                className='w-full object-cover'/>
                <Image src={user.avatar || "/noAvatar"} alt=""
                width={128} height={128} 
                className='w-32 h-32 absolute z-36 rounded-full  object-cover left-0 m-auto right-0 -bottom-16 ' />
              </div>


              <h1 className='mt-16 mb-4 text-2xl font-medium'>{user.name || user.surnname? user.name +" " + user.surnname : user.username}</h1>
              <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                     <p className='text-md  font-semibold'>{user._count.posts}</p>
                     <span className='text-sm'>Posts</span>

                  </div>
                  <div className="flex flex-col items-center">
                     <p className='text-md  font-semibold'>{user._count.follower}</p>
                     <span className='text-sm'>Followers</span>

                  </div>
                  <div className="flex flex-col items-center">
                     <p className='text-md  font-semibold'>{user._count.following}</p>
                     <span className='text-sm'>Following</span>

                  </div>
              </div>

            </div>
            <Feed username={user.username}/>
          </div>
       </div>
       
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user}/>
      </div>

    </div>
  )
}

export default ProfilePage