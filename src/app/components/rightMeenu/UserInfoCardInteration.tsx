"use client"


import { switchBlock, switchFollow } from '@/lib/actions'
import React, { useOptimistic, useState } from 'react'

type UserInfoCardInterationProps = {
    userId:string
    isBlock:boolean
    isFollowing:boolean
    isFollowingRequestSent:boolean
}
const UserInfoCardInteration = ({userId,isBlock,isFollowing,isFollowingRequestSent}:UserInfoCardInterationProps) => {
  const [userState, setUserState]  = useState({
    following:isFollowing,
    blocked:isBlock,
    followingRequest:isFollowingRequestSent
  })

  const follow = async()=>{
      switchOptimisticState('follow')
      try{
         await switchFollow(userId)
         setUserState((prev)=>({
            ...prev,
            following: prev.following  && false,
            followingRequest: !prev.following && !prev.followingRequest ? true : false

         }))
        }catch(err){
            throw err
        }
  }

  const block = async()=>{
    switchOptimisticState("block")
    try{
        await switchBlock(userId)
        setUserState(prev=>({
            ...prev,
            blocked:!prev.blocked
        }))
    }catch(err){
        console.log(err)
    }

  }

  const  [optimisticState, switchOptimisticState] = useOptimistic(
    userState,(state,value:"follow"|"block")=>value === "follow"?
        {
            ...state,
            following: state.following  && false,
            followingRequest: !state.following && !state.followingRequest ? true : false

        }
        :
        
        {
            ...state,
            blocked:!state.blocked
        }
    
        
    
  )


  return (
    <>
    <form className='w-full' action={follow}>
         <button className='bg-blue-500 text-white text-sm rounded-md p-2 w-full'>
            {optimisticState.following? "Following" : optimisticState.followingRequest? "request sent" : "Follow" }
        </button>
    </form>

    <form className='w-full flex justify-end' action={block}>
      <button className="text-sm  cursor-pointer text-red-900">
         {optimisticState.blocked ? "UnBlock User" : "Block User"}
      </button>
    </form>
    </>
  )
}

export default UserInfoCardInteration