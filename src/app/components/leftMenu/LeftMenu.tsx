import React from 'react'
import ProfileCard from './ProfileCard'
import Link from 'next/link'
import Image from 'next/image'
import Ads from '../Ads'
const LEFT_MENU_LINK =[
        {
            name : "My Post",
            image: "/posts.png"
        },
        {
            name : "Activity",
            image: "/activity.png"
        },
        {
            name : "MarketPlace",
            image: "/market.png"
        },
        {
            name : "Events",
            image: "/events.png"
        },
        {
            name : "Album",
            image: "/albums.png"
        },
        {
            name : "Videos",
            image: "/videos.png"
        },
        {
            name : "News",
            image: "/news.png"
        },
        {
            name : "Courses",
            image: "/courses.png"
        },
        {
            name : "Lists",
            image: "/lists.png"
        },
        {
            name : "Settings",
            image: "/settings.png"
        },

] 


const LeftMenu = ({type}:{type:"home" | "profile"}) => {
  return (
    <div className='flex flex-col gap-3'>
      {type === "home" && (<ProfileCard/>)}

      <div className="p-4 bg-white  rounded-lg shadow-md text-gray-500">
          {
            LEFT_MENU_LINK.map((item,index)=>(
              <>
                <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                  <Image src= {item.image} alt='' width={20} height={20}/>
                  <span>{item.name}</span>
                </Link>

                <hr className="border-t-1 border-gray-50 w-36 self-center" />

              </>
            ))
          }

      </div>


      <Ads size='sm'/>


    </div>
  )
}

export default LeftMenu