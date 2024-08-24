"use client"

import React,{useState} from 'react'
import Image from 'next/image'
import { deletePost } from '@/lib/actions'

const PostInfo = ({postId}:{postId:number}) => {
  const [open, setOpen] = useState(false)
  const deletePostWithId = deletePost.bind(null,postId)
  return (
    <div className='relative'>
     
                <Image src="/more.png" onClick={()=>setOpen((prev)=>!prev)}
                    alt="" width={16} height={16}  className='cursor-pointer'
                        />

                {
                    open && (
                        <div className="rounded-lg w-max p-4 absolute top-4 right-0 bg-gray-100 flex flex-col gap-2 
                        text-xs shadow-lg z-30">
                            <span className='cursor-pointer'>View</span>
                            <span className='cursor-pointer'>Re-post</span>
                            <form action={deletePostWithId}>
                                <button className='text-red-500'>Delete</button>
                            </form>

                        </div>
                    )
                }


                

      
    </div>
  )
}

export default PostInfo