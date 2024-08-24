"use client";

import React, { useState,useActionState } from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import { updateProfile } from "@/lib/actions";
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from "next/navigation";
import UpdateButton from "./UpdateButton";


const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>()
  const router = useRouter()


  const [state, formAction] = useActionState(updateProfile,{success:false,error:false,message:""})

  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh()
  };



  return (
    <div>
      <span
        className="text-blue-500 text-sm cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>

      {open && (
        <div className="fixed overflow-y-scroll bg-black/65 z-10 left-0 h-screen w-screen top-0 flex justify-center items-center ">
          <form
            action={(formData)=>formAction({formData,cover:cover?.secure_url})}
            className="relative p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/2"
          >
            {/* TITLE  */}
            <h1>Update Profile</h1>
            <div className="mt-4 text-xs text-gray-500">
              Use The Navbar profile to chnage the avatar or the username
            </div>
            {/* Cover  */}

            <CldUploadWidget uploadPreset="zztd0lnj" onSuccess={(result)=> setCover(result.info) }>
            {({ open }) => {
              return (    
                <div className="" onClick={()=>open()}>
                  <label htmlFor="coverPicture">Cover Picture</label>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Image
                      src={user.cover || "/noCover.png"}
                      alt=""
                      width={48}
                      height={32}
                      className="w-12 h-8 rounded-md object-cover"
                    />
                    <span className="text-xs underline text-gray-600">Change</span>
                  </div>
                </div>
              );
            }}
          </CldUploadWidget>
            
             

              {/* INPUT  */}

              <div className="flex flex-wrap justify-between gap-2 xl:gap-3">
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  className="ring-1 ring-gray-200 outline-none text-sm p-2 text-gray-700"
                  placeholder={user.name || "John"}
                  name="name"
                />
              </div>

              {/* INPUT  */}

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Surname
                </label>
                <input
                  type="text"
                  name="surnname"
                  className="ring-1 ring-gray-200 outline-none text-sm p-2 text-gray-700"
                  placeholder={user.surnname || "Doe"}
                />
              </div>

              {/* INPUT  */}

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Description
                </label>
                <input
                  type="text"
                  className="ring-1 ring-gray-200 outline-none text-sm p-2 text-gray-700"
                  placeholder={user.description || "we move in style"}
                  name="description"
                />
              </div>

              {/* INPUT  */}

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  className="ring-1 ring-gray-200 outline-none text-sm p-2 text-gray-700"
                  placeholder={user.city || "Lagos"}
                />
              </div>

              {/* INPUT  */}

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  School
                </label>
                <input
                  type="text"
                  name="school"
                  className="ring-1 ring-gray-200 outline-none text-sm p-2 text-gray-700"
                  placeholder={user.school || "Jams college"}
                />
              </div>

              {/* INPUT  */}

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Work
                </label>
                <input
                  type="text"
                  className="ring-1 ring-gray-200 outline-none text-sm p-2 text-gray-700"
                  placeholder={user.work || "Banker"}
                  name="work"
                />
              </div>

              {/* INPUT  */}

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Website
                </label>
                <input
                  type="text"
                  className="ring-1 ring-gray-200 outline-none text-sm p-2 text-gray-700"
                  placeholder={
                    user.website || "https://gilish-tech-service.vercel.app/"
                  }
                  name="website"
                />
              </div>

            <UpdateButton/>
            </div>

            {state.success && <span className="text-green-500">Profile has been updated</span> }
            {state.error && <span className="text-red-500">{state.message ? state.message :"Unkown Error occured"}</span> }

            {/* close  */}
            <div
              className=" absolute text-lg top-3 text-red-500 cursor-pointer right-2"
              onClick={handleClose}
            >
              X
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
