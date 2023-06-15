import React , {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export default function Nav() {

  


    return (
        <div className='bg-background-100 min-h-screen '>
            <div className='w-full bg-background-100 flex flex-col items-center pb-10'>
                <nav className='topLevelNavigation w-[95%]  '>
                    <div className='h-[140px]'>
                        <div className='flex justify-end items-center gap-5 h-[50%] p-5'>
                            <img className='h-6' src='/icons/bar/share.svg' />
                            <img className='h-6' src='/icons/bar/edit.svg' />
                        </div>
            
                    </div>
                    <div className='lowLevelNavigation flex justify-center '>
                        <div className='bg-white  flex justify-center items-center  h-[45px] w-full '>
                            <div className='bg-background-100 w-[80%] flex justify-center rounded  h-[65%] items-center '>
                                <NavLink to='/' className={({isActive})=> isActive ? 'w-[15.9%] flex justify-center items-center smallText NavBarActive h-[80%]' : 'w-[19.9%] flex justify-center items-center smallText '}>Profile</NavLink>
                                <NavLink to="/log-today" className={({isActive})=> isActive ? 'w-[15.9%] flex justify-center items-center smallText NavBarActive h-[80%]' : 'w-[19.9%] flex justify-center items-center smallText '}>Log</NavLink>
                                <NavLink to='/progress' className={({isActive})=> isActive ? 'w-[15.9%] flex justify-center items-center smallText NavBarActive h-[80%]' : 'w-[19.9%] flex justify-center items-center smallText '}>Progress</NavLink>
                                <NavLink to="/friends" className={({isActive})=> isActive ? 'w-[15.9%] flex justify-center items-center smallText NavBarActive h-[80%]' : 'w-[19.9%] flex justify-center items-center smallText '}>Friends</NavLink>
                                <NavLink to="/settings" className={({isActive})=> isActive ? 'w-[15.9%] flex justify-center items-center smallText NavBarActive h-[80%]' : 'w-[19.9%] flex justify-center items-center smallText '}>Settings</NavLink>
                            </div>
                        </div>
            
                    </div>
           
                </nav>
            </div>
            <Outlet />
        </div>
    )
}
