"use server"


export const testAction = async(formData:FormData)=>{


    console.log(formData.get("desc"))
  }
  