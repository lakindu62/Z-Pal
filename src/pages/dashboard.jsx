import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/auth'
import { Link } from "react-router-dom"
import { getProfileImage } from '../firebase-storage'


import Nav from '../components/Nav'
import ProfilePictureUpload from '../components/ProfileImage'
import ProfileSettings from '../components/ProfileSettings'
import TodaysLog from '../components/log/TodaysLogDisplay'


export default function Dashboard() {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const [displayImageUrl, setDisplayImageUrl] = useState('')
  const { currentUser, logout, userDetails } = useAuth()

  function handleLogout() {
    logout()
  }



  function handleProfileSettings() {
    setIsSettingsActive(!isSettingsActive)
    console.log(isSettingsActive)
  }


  useEffect(() => {
    currentUser.uid && getProfileImage(currentUser.uid)
      .then(url => {
        setDisplayImageUrl(url)
        console.log(url)
      })
      .catch(error => {
        console.log(error)
      })


  }, [currentUser.uid])


  return (

    <div className='h-screen bg-background-100 flex flex-col items-center'>

      <div className={`profile h-[358px] bg-white w-3/4 flex flex-col items-center justify-center gap-2 rounded-xl mb-3 relative py-6 ${isSettingsActive ? "opacity-0" : ''} `}>
        <img className='h-28 w-28 object-cover rounded-full' src={`${displayImageUrl ? displayImageUrl : "/icons/noProfileIcon.png"}`} />
        <div className='subHeaderText text-center'>{userDetails.fName} <br></br>{userDetails.sName}</div>
        <div className='mb-5'>{currentUser.email}</div>
        <img onClick={handleProfileSettings} src="/icons/settings.svg" alt="" />
      </div>




      <div className={`w-3/4 border-background-200 border fixed top-56  m-auto -z-10  bg-white duration-300 rounded-xl  ${isSettingsActive ? ' -translate-y-2 z-30 py-6 ' : "translate-y-2  p-0 border-white"}`}>
        <ProfileSettings onClick={handleProfileSettings} isSettingsActive={isSettingsActive} displayImageUrl={displayImageUrl} />
      </div>




      <div className='profile h-[120px] bg-white w-3/4 flex items-center justify-center gap-2 rounded-xl'>
        <div className='flex flex-col justify-between h-[75px]'>

          <div className='w-[100px] flex justify-between smallText'>
            <span>Bench</span>
            <div className='w-[50px] h-[100%] bg-background-200 formInput  rounded-md'></div>
          </div>
          <div className='w-[100px] flex justify-between smallText'>
            <span>Squat</span>
            <div className='w-[50px] h-[100%] bg-background-200  formInput rounded-md'></div>
          </div>
          <div className='w-[100px] flex justify-between smallText'>
            <span>Deadlift</span>
            <div className='w-[50px] h-[100%] bg-background-200 formInput  rounded-md'></div>
          </div>

        </div>
        <div className='h-[60%] w-1 bg-black rounded-lg' ></div>
        <div className='h-[85px] w-[100px] bg-black rounded-xl p-2 flex flex-col items-center justify-center'>
          <div className='text-white text-xs text-center'>My Personal <br></br> Best</div>
          <img className='h-6' src='/icons/orangeSettings.svg' />
        </div>

      </div>

      <div className='mb-10 mt-3 profile h-[120px] bg-white w-3/4 flex items-center justify-center gap-2 rounded-xl'>
        
      </div>
      <button onClick={handleLogout} className='btn-form rounded-xl mb-5 w-20 text-sm'>Sign Out</button>




    </div>











    // <div className='h-[80vh] flex flex-col justify-center items-center '>
    //     <div className='profileContainer flex flex-col gap-5 mb-10'>
    //         <div className='flex justify-center headerText'>Profile</div>
    //         <div><strong>Email</strong> : {currentUser.email}</div>
    //         <div><strong>UserID</strong> : {currentUser.uid}</div>
    //         <Link className='mr-auto ml-auto ' to="/update-profile"><button className='btn-form'>Update Profile</button></Link>
    //     </div>
    //     <button onClick={handleLogout} className=''>Log Out</button>
    // </div>
  )
}
