"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'

const UpdateButton = () => {
  const {pending} = useFormStatus()
  return (
    
        <button className="text-md shadow-md w-full p-2 mt-2 bg-blue-500 text-white disabled:bg-opacity-50 cursor-not-allowed" disabled={pending}>
                {pending?"Updating" : "Update"}
        </button>
   
  )
}

export default UpdateButton