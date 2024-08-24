import React from 'react'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/client'
import Post from './Post'

const Feed = async({username}:{username?:string}) => {
  const {userId} = auth()
  let posts:any[] = [];

  if(username){
    posts = await prisma.post.findMany({
      where:{
        user:{
          username:username
        }
      },

      include:{
        user:true,
        like:{
          select:{
            userId:true
          }
        },

        _count:{
          select:{
            comments:true
          }
        }
      },
      orderBy:{
        createdAt:"desc"
      }
      
    })
  }

  if(!username && userId){

    const following = await prisma.follower.findMany({
      where:{
        followerId:userId
      },
      select:{
        followerId:true
      }
    })


    const followingId = following.map(f=>f.followerId)

    posts  = await prisma.post.findMany({
      where:{
        userId:{
          in:followingId
        }
      },
      include:{
        user:true,
        like:{
          select:{
            userId:true
          }
        },

        _count:{
          select:{
            comments:true
          }
        }
      },
      orderBy:{
        createdAt:"desc"
      }
    })

  }
  return (
    <div className='p-4  bg-white rounded-lg flex flex-col  gap-4 justify-between text-sm shadow-md'>
      {posts?.length ? posts.map((post,index)=>(    
        <Post key={index} post={post}/> 
      ))

      :
      "No post found"
    }
   

    </div>
  )
}

export default Feed