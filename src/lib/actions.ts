"use server"



const NO_VAL = [undefined,null,""]

import { auth } from "@clerk/nextjs/server"
import prisma from "./client"
import { z } from "zod"
import { revalidatePath } from "next/cache"


export const switchFollow = async (userId: string) => {
    const { userId: currentUserId } = auth()
    if (!currentUserId) {
        throw new Error("user is not unauthenticated")
    }
    try {
        const existingFollow = await prisma.follower.findFirst({
            where: {
                followerId: currentUserId,
                followingId: userId
            }
        })


        if (existingFollow) {

            await prisma.follower.findFirst({
                where: {
                    id: existingFollow.id

                }
            })
        } else {

            const existingFollowRequest = await prisma.followRequest.findFirst({
                where: {
                    senderId: currentUserId,
                    receiverId: userId

                }
            })

            if (existingFollowRequest) {
                await prisma.followRequest.delete({
                    where: {
                        id: existingFollowRequest.id

                    }
                })


            } else {
                await prisma.followRequest.create({
                    data: {
                        senderId: currentUserId,
                        receiverId: userId

                    }
                })

            }

        }
    } catch (err) {
        throw err
    }





}



export const switchBlock = async (userId: string) => {
    const { userId: currentUserId } = auth()
    if (!currentUserId) throw new Error("user not authenticated")
    const blockedAlready = await prisma.block.findFirst({
        where: {
            blockerId: currentUserId,
            blockedId: userId
        }
    })

    if (blockedAlready) {
        await prisma.block.delete({
            where: {
                id: blockedAlready.id
            }
        })

    }

    else {
        await prisma.block.create({
            data: {
                blockerId: currentUserId,
                blockedId: userId
            }
        })
    }
}

export const  acceptFollowRequest  = async(userId:string)=>{
    try{

        const {userId:currentUserId} = auth()
        if(!currentUserId){
        throw Error("you are not authenticated")
    }

    const existingFollowRequest = await prisma.followRequest.findFirst({
        where:{
            senderId: userId,
            receiverId:currentUserId
        }

    })
    if(existingFollowRequest){
        await prisma.followRequest.delete({
            where:{
                id:existingFollowRequest.id

            }
        })

        await prisma.follower.create({
            data:{
                followerId:userId,
                followingId:currentUserId
            }
        })
    }


}catch(err){
    console.log(err)
}
}

export const  declineFollowReequest  = async(userId:string)=>{
    try{

        const {userId:currentUserId} = auth()
        if(!currentUserId){
        throw Error("you are not authenticated")
    }

    const existingFollowRequest = await prisma.followRequest.findFirst({
        where:{
            senderId: userId,
            receiverId:currentUserId
        }

    })
    if(existingFollowRequest){
        await prisma.followRequest.delete({
            where:{
                id:existingFollowRequest.id

            }
        })

   
    }


}catch(err){
    console.log(err)
}
}


export const updateProfile = async(prevState:{success:boolean,error:boolean,message?:string},
    payload:{formData:FormData,cover:string})=>{

    const {formData} = payload
    const {cover} = payload

    const {userId} = auth()

    if(!userId){
        return {success:false,error:true,message:"You dont have permission"}
    }

    const Profile = z.object({
        cover:z.string().optional(),
        name:z.string().max(60).optional(),
        surnname:z.string().max(60).optional(),
        description:z.string().max(60).optional(),
        city:z.string().max(60).optional(),
        school:z.string().max(60).optional(),
        work:z.string().max(60).optional(),
        website:z.string().max(60).optional(),
                
        }).refine(data=>Object.values(data).some(val=>!NO_VAL.includes(val) ),{message:"all input cannot be empty"})


    type ProfileType = z.infer<typeof Profile>

            
    const field  = Object.fromEntries(formData)
    const validateFields = Profile.safeParse({...field,cover})

    
    
    // const filteredData = Object.keys(valData).filter((val)=>valData[val] !== "") 
    
    
    if (validateFields.error){

        const allError =  validateFields.error.errors.map((item)=>item.message)
       
        return {success:false,error:true,message:allError.join(",")}
        
    }else{
        const valData = validateFields.data
        const filteredData  = Object.keys(valData).reduce((acc,key)=>{
            const value = valData[key as keyof ProfileType]
            if(value !==""){
                acc[key as keyof ProfileType] = value
            }
            return valData
        },{} as ProfileType)

        
        try{
            await prisma.user.update({
                data:{
                ...filteredData
                
               
            },
            where:{
                id : userId
            }
          })

          return {success:true,error:false,message:""}

          
       }catch(err ){
        if(err instanceof Error){

            return {success:false,error:true,message:err.message}
        }else{

            return {success:false,error:true,message:"unknon error occur"}
        }
    }
    }
    

  
    // console.log(formData)
    


}

export const switchLike = async(postId:number)=>{
    const {userId} = auth()
    if(!userId){
        throw new Error("you are not authenticated")
    }
    const existingLike = await prisma.like.findFirst({
        where:{
            userId:userId,
            postId:postId
        }
    })

    if(existingLike){

        await prisma.like.delete({
            where:{
              id:existingLike.id
    
            }
        })
    }
    else{

        await prisma.like.create({
            data:{
                userId,
                postId,
    
            }
        })
    }

}


export const AddComment = async(postId:number, desc:string)=>{
    const {userId} = auth()
    if(!userId){throw new Error("unauthenthicated user")}

    try{
        const createComment = await prisma.comment.create({
            data:{
                desc,
                userId,
                postId
            },
            include:{
                user:true
            }
        })

        return createComment
    }catch(err){
        console.log(err)

        throw new Error("unable to add comment")
    }





} 



export const addPost = async (formData:FormData,img:string)=>{
    const desc = formData.get("desc") as string

    const Desc = z.string().min(1).max(255)
    const validDesc = await Desc.safeParseAsync(desc)

    if(!validDesc.success){

        throw Error("Invaid Description")

    }

    const {userId} = auth()

    if (!userId){
        throw Error("You don't have permissio")
    }

    try{
        await prisma.post.create({
            data:{
                desc:validDesc.data,
                userId:userId,
                img:img
            }
        })

        revalidatePath("/")

    }catch(err){
        console.log(err)
        // throw new Error(err a)

    }
    
}
export const addStory = async (img:string)=>{
  

   
    const {userId} = auth()

    if (!userId){
        throw Error("You don't have permissio")
    }

    try{
        const existingStory = await prisma.story.findFirst({
            where:{
                userId
            }
        })

        if (existingStory){
            await prisma.story.delete({
                where:{
                    id:existingStory.id
                    
                }
            })

        }
        const createdStory = await prisma.story.create({
            data:{
               
                userId:userId,
                image:img,
                expiresAt: new Date(Date.now() + (24 * 60 * 60 * 1000) )
            },
            include:{
                user:true
            }
        })

        return createdStory

    }catch(err){
        console.log(err)
        // throw new Error(err a)

    }
    
}



export const deletePost = async (postId:number)=>{
    const {userId} = auth()

    if (!userId){
        throw Error("You don't have permissio")

    }
    try{

        await prisma.post.delete({
            where:{
                id:postId,
                userId
            }
        })

        revalidatePath("/")

    }catch(err){
        console.log(err)
    }

}