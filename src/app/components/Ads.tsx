import Image from 'next/image'
import React from 'react'

const Ads = ({size}: {size:"sm" |"md"| "lg"}) => {
  return (
    <div className='p-4 bg-white  rounded-lg shadow-md text-sm' >
        {/* TOP  */}
        <div className="flex items-center justify-between text-gray-500 font-mediun">
            <span>Sponsored Ads</span>
            <Image src={"/more.png"} width={16} height={16} alt=''/>
        </div>
        {/* Bottom */}

        <div className={`flex flex-col mt-4 ${size ==="sm"? "gap-2" : "gap-4"  }`}>
            <div className={`relative w-full ${size=="sm"? "h-24" : size=="md"? "h-36" : "h-48" }`} >
                <Image src="https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=600" fill alt=''
                className='rounded-lg object-cover'/>

            </div>

            <div className="flex items-center gap-4">
                <Image src="https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=600"
                 height={24} width={24} alt=''
                className='rounded-full w-6 h-6'/>

                <span className="text-blue-500 font-semibold">Awesome SKy</span>
            </div>

            <p className={size=="sm" ? "text-xs" :"text-sm"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus explicabo quisquam nesciunt, adipisci veritatis quasi iusto dolor consequatur suscipit sint.
            </p>

            <button className='py-2 w-full text-gray-500 bg-gray-200 rounded-sm'>Learn More</button>

        </div>

    </div>
  )
}

export default Ads