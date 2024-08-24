"use client"

import React, { useOptimistic, useState } from 'react'
import Image from 'next/image'
import { FollowRequest,User } from '@prisma/client'
import { acceptFollowRequest, declineFollowReequest } from '@/lib/actions'


type FriendRequestListProps = FollowRequest & {
    sender : User
}
const FriendRequestList = ({res}:{res:FriendRequestListProps[]}) => {
  const [requestState,setRequestState] = useState(res)


  const accept = async(resId:number,userId:string)=>{
    removeOptimisticRequest(resId)
    try{
        await acceptFollowRequest(userId)
        setRequestState((prev)=>prev.filter((item)=>(
            item.id !== resId
        )))
    }catch(err){
        console.log(err)
    }

  }

  const decline = async(resId:number,userId:string)=>{
    removeOptimisticRequest(resId)
    try{
        await declineFollowReequest(userId)
        setRequestState((prev)=>prev.filter((item)=>(
            item.id !== resId
        )))
    }catch(err){
        console.log(err)
    }

  }

  const [optimisticRequest,removeOptimisticRequest] = useOptimistic(requestState,(state,value:number)=>(
    state.filter((item)=>(
        item.id !== value
    ))
  )) 

  return (
    <div className='flex flex-col gap-3'>
        {
            optimisticRequest.length && optimisticRequest.map((item,index)=>(
            <div className="flex items-center justify-between" key={item.id}>
                <div className="flex items-center gap-4 900 flex-1">
                        <Image width={30} height={30} src={item.sender.avatar!} alt='s' 
                        className='w-10 h-10 object-cover rounded-full'/>
                        <span className="text-gray-500">{item.sender.username}</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <form action={()=>accept(item.id,item.senderId)}>
                        <button>
                            <Image src={"/accept.png"} alt='' width={20} height={20} className='w-6 h-6 rounded-full object-cover'/>
                        </button>
                    </form>
                    <form action={()=>decline(item.id,item.senderId)}>
                        <button>

                         <Image src={"/reject.png"} alt='' width={20} height={20} className='w-6 h-6 rounded-full object-cover'/>
                        </button>
                    </form>
                </div>

            </div >

            )

            )
        }
         

    </div>
  )
}

export default FriendRequestList