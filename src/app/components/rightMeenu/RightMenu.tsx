import React,{Suspense} from 'react'
import FriendRequest from './FriendRequest'
import Birthday from './Birthday'
import Ads from '../Ads'
import UserInformationCard from './UserInformationCard'
import UserMediaCard from './UserMediaCard'
import { User } from '@prisma/client'
// import {Sus}

type RightMenuProps = {
  user?:User
}


const RightMenu = ({user} :RightMenuProps) => {
  return (
    user ?(<div className='flex flex-col gap-4'>
        <Suspense fallback="loading">
            <UserInformationCard user={user}/>
        </Suspense>
        <Suspense fallback="loading">
            <UserMediaCard user={user}/>
        </Suspense>
        <FriendRequest/>
        <Birthday/>
        <Ads size='md'/>
    </div>):
    <div className='flex flex-col gap-3 '>
        <FriendRequest/>
        <Birthday/>
        <Ads size='md'/>

    </div>
  )
}

export default RightMenu