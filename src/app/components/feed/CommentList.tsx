"use client"

import React,{useState,useOptimistic} from 'react'
import Image from 'next/image'
import {Comment,User} from "prisma/prisma-client"
import { useUser } from '@clerk/nextjs';
import { AddComment } from '@/lib/actions';

type CommentListProps = Comment & {user:User};


const CommentList = ({comments,postId}:{comments:CommentListProps[],postId:number}) => {
    const {user} = useUser()
    
    const [commentState,setCommentState] = useState(comments)
    const [desc,setDesc] = useState("") 

    const add =  async()=>{
        if (!user || !desc ) return; 

        addOptimisticComment({
            id: Math.random(),
            desc,
            createdAt:new Date(Date.now()),
            updatedAt:new Date(Date.now()),
            userId:user.id,
            postId:postId,
            user:{
                id:user.id,
                cover:"",
                avatar:user.imageUrl || "/noAvatar.png",
                username:"sending Please wait",
                name:"",
                surnname:"",
                city:"",
                description:"",
                work:"",
                school:"",
                website:"",
                createdAt:new Date(Date.now()),

            }


        })
        try{
            const createdComment =  await AddComment(postId,desc)
            setCommentState(prevState=>[...prevState,createdComment])
        }catch(err){
            throw err
        }


    }


    
    const [optimisticComment,addOptimisticComment] = useOptimistic(commentState,(state,value:CommentListProps)=>{
        return [...state,value]
    
    })
    return (
    <>
      <div className="flex item-center gap-4 ">
            <Image src={user?.imageUrl || "/noAvatar.png"} 
            alt='' width={32} height={32} className='size-8 rounded-full'/>
                <form action={add} className='w-full' method='post'>
                    <div className="flex flex-1 bg-slate-100 px-6 py-2 w-full  ">
                            <input type='text' placeholder='write a comment...' 
                            className='bg-transparent outline-none ring-blue-500 flex-1'
                            onChange={(e)=>setDesc(e.target.value)}/>
                            <button>
                                <Image src="/emoji.png" 
                                alt='' width={16} height={16} className='size-8 rounded-full'/>
                            </button>
                    </div>
                </form>
        </div>
         

         {/* COMMENTS  */}
         {
            optimisticComment.map((comment,index)=>(

            <div className="class" key={index}>
            {/* COMMENT  */}
            <div className="flex gap-4 justify-between mt-6 " >
                {/* avatar  */}
                <Image src={comment.user.avatar || "/noAvatar.png"} 
                     alt='' width={32} height={32} className='size-8 rounded-full'/>
                {/* DESC  */}
                <div className="flex-1 flex flex-col gap-2">
                    <span className='font-medium'>Gilish Tech</span>
                    <p>{comment.desc}</p>
                    <div className="flex items-center gap-8 text-xs text-gray-500">
                        <div className="flex items-center  gap-4">
                            <Image src={"/like.png"} alt='' width={16} height={16}  className="cursor-pointer size-4"/>
                            <span className='text-gray-300'>|</span>
                            <span className='text-gray-500'>123 Likes</span>
                        </div>
                        <div className="">Reply</div>
                    </div>
                </div>
                {/* ICON  */}
                <Image src={"/more.png"} alt='' width={16} height={16}  className="cursor-pointer size-4"/>
            </div>

        </div>
        ))
        }
    
    </>
  )
}

export default CommentList