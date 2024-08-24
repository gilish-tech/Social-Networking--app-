"use client"


import React from 'react'
import { useFormStatus,useFormState } from 'react-dom'

const AddPostButton = () => {

  const {pending} = useFormStatus()
  return (
   <button disabled={pending} className='bg-blue-500 disabled:bg-blue-300  gap-2  text-white 
   disabled:cursor-not-allowed flex justify-center items-center p-2 rounded-md shadow-md'>
      {pending && <div className="w-3 h-3 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>}
      {pending ? "Sending" : "Send"}
   </button>
  )
}

export default AddPostButton