"use client"

import React,{useOptimistic,useState} from 'react'
import Image from 'next/image'
import { useAuth } from '@clerk/nextjs'
import { switchLike } from '@/lib/actions'

const PostInteraction = ({postId,likes,commentNumber}:{postId:number,likes:string[],commentNumber:number}) => {

  const {userId} = useAuth() 
  const [likeState, setLikeState] = useState({
    likeCount:likes.length,
    isLiked: userId ? likes.includes(userId) : false 
  })

  const [optimisticLike,switchOptimisiticLike] = useOptimistic(likeState,(state,action)=>(
    {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1 ,
        isLiked:!state.isLiked 
    }
  ))

  const likeAction = async ()=>{
    switchOptimisiticLike("")
    try{
        await switchLike(postId)
        setLikeState(prevState=>(
            {
                likeCount: prevState.isLiked ? prevState.likeCount - 1 : prevState.likeCount + 1 ,
                isLiked:!prevState.isLiked 

            }

        ))

    }catch{

    }
  }
  return (
    <div className="flex justify-between items-center my-4">
        <div className="flex gap-8">
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                <form  action={likeAction}>
                    <button>
                        <Image src={optimisticLike.isLiked ? "/liked.png" :"/like.png"} width={15} height={15} alt='' className='cursor-pointer'/>
                    </button>

                </form>
                <span className='text-gray-300'>|</span>
                <span className='text-gray-500'>{optimisticLike.likeCount} <span className='hidden md:inline'>Likes</span></span>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                <Image src={"/comment.png"} width={15} height={15} alt='' className='cursor-pointer'/>
                <span className='text-gray-300'>|</span>
                <span className='text-gray-500'>{commentNumber} <span className='hidden md:inline'>Comments</span></span>
            </div>

            
        </div>
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                <Image src={"/share.png"} width={15} height={15} alt='' className='cursor-pointer'/>
                <span className='text-gray-300'>|</span>
                <span className='text-gray-500'><span className='hidden md:inline'>Share</span></span>
            </div>
    </div>
  )
}

export default PostInteraction