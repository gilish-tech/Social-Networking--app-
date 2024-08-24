import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Birthday = () => {
  return (
    <div className='p-4 bg-white  rounded-lg shadow-md text-sm flex flex-col gap-4'>
    {/* TOP  */}
    <div className="flex justify-between items-center font-medium">
        <span className='text-gray-500'>Birthdays</span>
        <Link href="/" className='text-blue-500'>See all</Link>
    </div>

    {/* USER  */}
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 900 flex-1">
            <Image width={30} height={30} src="https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=600" alt='s' 
            className='w-10 h-10 object-cover rounded-full'/>
            <span className="text-gray-500">Raphael James</span>
        </div>
        <div className="flex items-center justify-end gap-2">
           <button className='bg-blue-500 px-3 py-1 text-white text-sm rounded-md '>Celebrate</button>
        </div>


    </div>
       {/* UPCOMING  */}
       <div className="P-4 BG-SLATE-100 rounded-lg flex items-center gap-4">
          <Image width={24} height={24} src="/gift.png" alt='' />
          <Link href="/" className='flex flex-col'>
               <span className='text-gray-700 font-semibold'>Upcoming BirthDays</span>
               <span className='text-gray-500'>see other sixteen people having the next birthday</span>
          </Link>

       </div>

    </div>
  )
}

export default Birthday