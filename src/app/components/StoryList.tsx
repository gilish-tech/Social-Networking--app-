"use client"

import { Story,User } from '@prisma/client'
import React,{useState,useOptimistic} from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { CldUploadWidget } from 'next-cloudinary'
import { addStory } from '@/lib/actions'

  
type StoryWithUserType = Story & {user:User}

const StoryList = ({stories,userId}:{stories:StoryWithUserType[],userId:string} ) => {
    const [storyList,setStoryList] = useState(stories)
    const [img,setImg] = useState<any>(null) 
    const {user,isLoaded} = useUser()
    const [opimisticStories,addOptimisticStories] = useOptimistic(storyList,(state,value:StoryWithUserType)=>{

        const data =  [...state,value]
        console.log("optimistic stuff",data)
        return data

    }
    )
    
    // if (!user){
    //     return null
    // }
    
    // if (!isLoaded){
    //     return "Loading"
    // }
    

    const add = async()=>{
        if (!img?.secure_url) return;
        addOptimisticStories({
            id: Math.random(),
            image:img.secure_url,
            createdAt:new Date(Date.now()),
            expiresAt:new Date(Date.now() + 24 * 60 * 60 * 1000 ),
            userId:userId,
            user:{
                id:userId,
                cover:"",
                avatar:user?.imageUrl || "/noAvatar.png",
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
            const createdStory = await addStory(img.secure_url)
            setStoryList((prevStory)=>[createdStory!, ...prevStory])
            setImg(null)
        }catch(err){

        }

    }

  return (
    <>
          <CldUploadWidget uploadPreset="zztd0lnj" onSuccess={(result)=> setImg(result.info) }>
            {({ open }) => {
              return (    
          
            <div className="flex flex-col items-center  gap-2 cursor-pointer relative " >

                <Image src={img || img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                width={80} height={80} alt="" className="w-20 h-20 rounded-full ring-2 object-cover" onClick={()=>open()} />

                {
                    img ? (
                    <form action={add}>

                        <button className='bg-blue-500 p-1 text-sm text-white  rounded-md'>Send</button>

                    </form>)
                    :
                    (

                        <span></span>
                    )
                }
                <span className="font-medium">Add a story</span>

                <div className="absolute text-4xl top-[10px] text-gray-200" onClick={()=>open()}>+</div>
            </div>

                
              );
            }}
          </CldUploadWidget>
    {
        opimisticStories?.map((story,index)=>(
            <div className="flex flex-col items-center  gap-2 cursor-pointer " key={index}>
                    <Image src={story.image || story.user.avatar || "/noAvatar.png"}
                    width={80} height={80} alt="" className="w-20 h-20 rounded-full ring-2 " />
                    <span className="font-medium">{story.user.name || story.user.username}</span>
                </div>

))
}
    
</>
  )
}

export default StoryList