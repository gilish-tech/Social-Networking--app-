"use client"


const NAV_LINKS = [
    {
        name: "Home",
        link:"/"
    },
    {
        name: "Friend",
        link:"/"
    },
    {
        name: "Group",
        link:"/"
    },
    {
        name: "Stories",
        link:"/"
    },
    {
        name: "Login",
        link:"/"
    },
]


import React, { useState } from 'react'
import Link from 'next/link'

const MobileMenu = () => {
    const [isOpen,setIsOpen] = useState(false)
    console.log(isOpen)
  return (
    <div className="md:hidden">

        <div className='flex flex-col gap-[4.5px] cursor-pointer' onClick={()=>setIsOpen((prevState)=>!prevState)  }>
            <div className={`w-6 h-1 bg-blue-500 origin-left ease-in-out duration-500 ${isOpen && 'rotate-[45deg]'}`} ></div>
            <div className={`w-6 h-1 bg-blue-500 ease-in-out duration-500 ${isOpen && 'opacity-0'}`}></div>
            <div className={`w-6 h-1 bg-blue-500 origin-left  ease-in-out duration-500 ${isOpen &&  '-rotate-45'}`}></div>

            {
                isOpen &&(
                    <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] 
                    bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
                        {
                            NAV_LINKS.map((items,index)=>(

                                <div className='flex flex-col items-center gap-2 group' key={index}>
                                
                                    <Link href={items.link}>{items.name}</Link>
                                    <div className="w-[80%] h-1 group-hover:bg-blue-600 rounded-md"></div>
                                </div>
                            ))
                        }
                
                    </div>
                )
            }

        </div>
    </div>
  )
}

export default MobileMenu