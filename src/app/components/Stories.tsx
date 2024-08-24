import React from 'react'
import Image from 'next/image'
import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import StoryList from './StoryList'
const Stories = async() => {

  const {userId:currentUserId} = auth()
  if(!currentUserId) return null;
  const stories = await prisma.story.findMany({
    where:{
      expiresAt:{
        gt:new Date()
      },
      OR:[
        {
          user:{
            follower:{
              some:{
                followerId:currentUserId

              }
            }
          } 
        }
      ]
    },

    include:{
      user:true
    }

  })
  return (
    <div className='p-4 bg-white rounded-lg shadow-md overflow-scroll text-sm scrollbar-hidden'>

           <div className="flex gap-8 w-max">
              <StoryList stories={stories} userId={currentUserId} />
           
            </div>

    </div>
  )
}

export default Stories