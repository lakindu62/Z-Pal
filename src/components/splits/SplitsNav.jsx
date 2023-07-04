import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const SplitsNav = () => {

    const navigate = useNavigate()

    const goToPreviousRoute = () => {
        navigate(-1); // Navigates to the previous route in the history stack
      };

  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='w-11/12 bg-white flex justify-between px-4 py-1 rounded-lg font-medium text-sm'>
            <img className='cursor-pointer' onClick={goToPreviousRoute} src="/icons/backwards.svg" alt="" />
            <span>Workout Management</span>
            <div></div>
        </div>
        <Outlet/>
    </div>
  )
}

export default SplitsNav