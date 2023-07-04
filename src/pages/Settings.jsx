import React from 'react'
import { useAuth } from '../contexts/auth'
import { Link } from 'react-router-dom'

export default function Settings() {
  
  const {profileImageUrl , userDetails} = useAuth()

  return (
    <div className='w-full flex flex-col justify-center items-center bg-background-100 pb-10 '>
      <div className='w-10/12 h-[125px] bg-white mb-8  rounded-3xl flex flex-col justify-center items-center pt-2'>
        <img className='h-[64px] w-[64px] object-cover rounded-full mb-2' src={profileImageUrl} alt="" />

        <div className='flex gap-2 justify-center items-center'>
          <span className='text-sm font-medium'>
            {userDetails.fName}
          </span>
          <img className='h-3' src="/icons/pen.svg" alt="" />
        </div>
      </div>
      
      <div className='w-3/4 mb-8'>
        <div className='mb-3 text-[#8F8F8F] font-medium tracking-wide'>Workout Management</div>
        <div className='flex flex-col gap-2'>
          <Link to='/settings/splits' className='text-sm flex justify-between px-4 bg-background-200 py-3 rounded-lg'>
            Workout Splits
            <img className='w-4' src="/icons/forwards.svg" alt="" />
          </Link>
          <Link to='#' className='text-sm flex justify-between px-4 bg-background-200 py-3 rounded-lg'>
            #
            <img className='w-4' src="/icons/forwards.svg" alt="" />
          </Link>
          <Link to='#' className='text-sm flex justify-between px-4 bg-background-200 py-3 rounded-lg'>
            #
            <img className='w-4' src="/icons/forwards.svg" alt="" />
          </Link>
          <Link to='#' className='text-sm flex justify-between px-4 bg-background-200 py-3 rounded-lg'>
            #
            <img className='w-4' src="/icons/forwards.svg" alt="" />
          </Link>

        </div>
      </div>
      <div className='w-3/4 '>
        <div className='mb-3  text-[#8F8F8F] font-medium tracking-wide'>Account Management</div>
        <div className='flex flex-col gap-2'>

          <Link to='/update-profile' className='text-sm flex justify-between px-4 bg-background-200 py-3 rounded-lg'>
            Update Profile
            <img className='w-4' src="/icons/forwards.svg" alt="" />
          </Link>
          <Link to='/reset-password' className='text-sm flex justify-between px-4 bg-background-200 py-3 rounded-lg'>
            Change Password
            <img className='w-4' src="/icons/forwards.svg" alt="" />
          </Link>
          <Link to='#' className='text-sm flex justify-between px-4 bg-background-200 py-3 rounded-lg'>
            #
            <img className='w-4' src="/icons/forwards.svg" alt="" />
          </Link>
          <Link to='#' className='text-sm flex justify-between px-4 bg-background-200 py-3 rounded-lg'>
            #
            <img className='w-4' src="/icons/forwards.svg" alt="" />
          </Link>






        </div>
      </div>
    </div>
  )
}
