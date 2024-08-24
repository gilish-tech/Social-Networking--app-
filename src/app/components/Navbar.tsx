import React from 'react'
import Link from 'next/link'
import MobileMenu from './MobileMenu'
import Image from 'next/image'
import { ClerkLoading, ClerkLoaded,SignedIn,SignedOut, UserButton } from '@clerk/nextjs'



const NAV_LINK_LG = [
    {
        name:"HomePage",
        image:"/home.png"

    },
    {
        name:"Friends",
        image:"/friends.png"

    },

    {
        name:"Stories",
        image:"/stories.png"

    },
]



const Navbar = () => {

  return (
    <div className='h-24 flex justify-between items-center overflow-hidden'> 

        {/* left */}
        <div className="md:hidden lg:block w-[20%]">
            <Link href={"/"} className='font-bold text-2xl  text-blue-600'>Gilbert </Link>
        </div>
        {/* center */}
        <div className="hidden md:flex gap-6 w-[50%] items-center justify-between">
            {/* Links */}

            <div className="flex items-center gap-6 text-gray-600 text-sm">
                
                    {
                        NAV_LINK_LG.map((item,index)=>(
                            
                            <Link href="/" className="flex gap-2" key={index}>
                                    <Image src={item.image} alt='Homepage' width={16} height={16}
                                     className='object-contain'/>
                                    <span>{item.name}</span>
                                </Link>
                            ))
                        }
            </div>

            <div className="hidden  xl:flex py-2 px-5 bg-slate-100  items-center rounded-xl">
                <input type="text"  placeholder='search...'
                   className='bg-transparent outline-none '/>
                <Image src="/search.png" alt='' width={12} height={12}/>
            </div>
        </div>

        {/* right */}
        <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
                <MobileMenu/>

                <ClerkLoading>
                    <div className="w-6 h-6 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                </ClerkLoading>

                <ClerkLoaded>
                      <SignedIn>
                         
                            <div className="cursor-pointer">
                                <Image src="/people.png" width={24} height={24} alt=''/>
                            </div>
                            <div className="cursor-pointer">
                                <Image src="/messages.png" width={20} height={20} alt=''/>
                            </div>
                            <div className="cursor-pointer">
                                <Image src="/notifications.png" width={20} height={20} alt=''/>
                            </div>

                         

                         <UserButton/>
                      </SignedIn>
                      
                      <SignedOut>
                        <div className="flex items-center gap-2 text-sm">
                            <Image alt='l' src="/login.png" width={20} height={20}/>
                            <Link href={"/sign-in"}>Login/Register</Link>
                        </div>
                      </SignedOut>
                </ClerkLoaded>
        </div>


    </div>
  )
}

export default Navbar