"use client"
import React,{useState} from 'react'
import Image from 'next/image'
import prisma from '@/lib/client'
import { useUser } from '@clerk/nextjs'
// import { testAction } from '@/lib/gg
import { CldUploadWidget } from 'next-cloudinary';
import AddPostButton from './AddPostButton'
import { addPost } from '@/lib/actions'



const AddPost = () => {

  const {user,isLoaded} = useUser()
  const  [desc, setDesc] = useState("")
  const  [img, setImage] = useState<any>(false)



  if(!isLoaded){
    return <h1>Loading</h1>
  }

 

  return (
    <div className='p-4  bg-white rounded-lg flex flex-col  gap-4 justify-between text-sm shadow-md'>
      <div className="flex gap-3 flex-1 ">
        {/* AVATAR  */}
        <Image width={80} height={80}
        src={user?.imageUrl || ""}
          alt='' className='w-12 h-12 rounded-full ring-2'/>
        {/* POST  */}
          {/* TextAREA  */}
          <form className='flex w-full items-center' action={(formData)=>addPost(formData,img?.secure_url || "") }>

            <textarea placeholder={"What's on your mind?"}
             onChange={(e)=>setDesc(e.target.value)}
            name="desc"
            className='outline-none bg-slate-100 flex-1 p-2'/>
            <Image  src={img ? img.secure_url : "/emoji.png"} alt='' width={20} height={20}
            className='w-5 h-5 cursor-pointer self-end'/>

            <AddPostButton/>
          </form>
      </div>
      {/* POST OPTIONS */}
      <div className="flex gap-4 justify-center items-center text-gray-400 flex-wrap">

      <CldUploadWidget uploadPreset="zztd0lnj" onSuccess={(result)=> setImage(result.info) }>
            {({ open }) => {
              return (    
          
              <div className="flex items-center gap-2"  onClick={()=>open()}>
                  <Image src="/addImage.png" alt='' width={20} height={20} />
                  <span>photo</span>
                  
              </div>
                
              );
            }}
          </CldUploadWidget>
        
         
            <div className="flex items-center gap-2" >
                <Image src="/videos.png" alt='' width={20} height={20} />
                <span>video</span>
                
            </div>
         
            <div className="flex items-center gap-2" >
                <Image src="/poll.png" alt='' width={20} height={20} />
                <span>polls</span>
                
            </div>
         
            <div className="flex items-center gap-2" >
                <Image src="/events.png" alt='' width={20} height={20} />
                <span>Events</span>
                
            </div>
         
         

      </div>
    </div>
  )
}

export default AddPost