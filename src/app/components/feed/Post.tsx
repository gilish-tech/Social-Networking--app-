import React, { Suspense } from 'react'
import Image from 'next/image'
import Comments from './Comments'
import { Post as PostPrisma,User } from '@prisma/client/edge'
import PostInteraction from './PostInteraction'
import PostInfo from './PostInfo'
import { auth } from '@clerk/nextjs/server'

type PostProps = PostPrisma   & {   user:User,} & {like:{userId:string}[]} & {_count:{comments:number}}
const {userId} = auth()
const Post = ({post}:{post:PostProps}) => {
  return (
    <div className='flex flex-col gap-4'>
        {/* USER  */}
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <Image src={post.user.avatar || "noAvatar.png"} 
                alt="" width={40} height={40} 
                className='w-10 h-10 rounded-full' />
                <span className='font-medium'>
                    {(post.user.surnname && post.user.name) ? (
                        post.user.surnname + " " + post.user.name
                    ) 
                    :
                    
                    post.user.username
                
                }
                </span>
                
            </div>

           {userId === post.user.id}  <PostInfo postId={post.id}/>
        </div>

        {/* DES  */}

        <div className="flex flex-col gap-4">

            <div className="w-full min-h-96 relative">
                {
                    post.img && (
                        <Image src={post.img} 
                        alt="" fill className='rounded-md object-cover'
                        />

                    )


                }
                

            </div>
            <span>{post.desc}</span>
        </div>


        {/* ACTIONS */}
       


       <Suspense fallback="loading">

       
        <PostInteraction postId={post.id} likes={post.like.map(item=>item.userId)} commentNumber={post._count.comments}/>

       </Suspense>
        <Comments postId={post.id}/>


    </div>
  )
}

export default Post