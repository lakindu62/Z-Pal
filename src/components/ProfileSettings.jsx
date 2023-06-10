import React, { useState , useEffect } from 'react'
import { useAuth } from '../contexts/auth'
import ProfileImage from '../components/ProfileImage'

export default function ProfileSettings({ onClick, isSettingsActive , displayImageUrl }) {
    const [isUploadImageActive, setIsUploadImageActive] = useState(false)
    const { userDetails } = useAuth()

    function handleUploadImage() {
    
        setIsUploadImageActive(!isUploadImageActive)

    }









    return (

        <div className='flex flex-col gap-5 relative justify-center items-center   '>
        {!isUploadImageActive ? 
        <div>
            {isSettingsActive && <img onClick={onClick} className='h-12 w-12 object-cover bg-white absolute -right-14 -top-9 rounded-full flex items-center justify-center' src='/icons/settingsExit.svg' />}
            <div className='flex justify-start gap-2 items-center px-10 '>
                <img onClick={handleUploadImage} className='h-16 w-16 object-cover rounded-full' src={`${displayImageUrl ? displayImageUrl : "/icons/noProfileIcon.png"}`}  alt="" />
                <div className='flex flex-col'>
                    <span>Megan Nortan</span>
                    <span onClick={handleUploadImage} className='smallText text-[#007AFF] cursor-pointer hover:text-blue-800'>Change profile photo</span>
                </div>
            </div>
            <div className='mt-6'>
                <form className='flex flex-col  px-10 w-full '>
                    <div className='flex  gap-5 justify-between w-full'>
                        <label htmlFor="">Name</label>
                        <input className='formInput bg-background-200  ' type="text" name="" id="" placeholder={userDetails.fName} />
                    </div>

                    <div className='flex  gap-5 justify-between'>
                        <label htmlFor="">Email</label>
                        <input className='formInput bg-background-200' type="text" name="" id="" placeholder={userDetails.email} />
                    </div>

                    <div className='flex  gap-5 justify-between'>
                        <label htmlFor="">Phone</label>
                        <input className='formInput bg-background-200' type="text" name="" id="" />
                    </div>

                    <div className='flex  gap-5 justify-between'>
                        <label htmlFor="">Gender</label>
                        <input className='formInput bg-background-200' type="text" name="" id="" />
                    </div>
                </form>
            </div>
            <div className='flex justify-center'><button className="btn-profileSettings-upload text-white smallText ">upload</button></div>
            </div>

             :

          
                 <ProfileImage handleUploadImage={handleUploadImage} isUploadImageActive={isUploadImageActive} displayImageUrl={displayImageUrl}  />
         
            }

           

           
        </div>
    )
}
