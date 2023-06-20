import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export default function Nav() {
    const location = useLocation();
    const [activeNavLink, setActiveNavLink] = useState('');
    useEffect(() => {
        const pathname = location.pathname;
        if (pathname === '/') {
            setActiveNavLink('Profile');
        } else if (pathname === '/log-today') {
            setActiveNavLink('Log');
        } else if (pathname === '/progress') {
            setActiveNavLink('Progress');
        } else if (pathname === '/friends') {
            setActiveNavLink('Friends');
        } else if (pathname === '/settings') {
            setActiveNavLink('Settings');
        }
    }, [location]);


    return (
        <div className='bg-background-100 min-h-screen '>
            <div className='w-full bg-background-100 flex flex-col items-center pb-10'>
                <nav className='topLevelNavigation w-11/12'>
                    <div className='h-[140px]'>
                        <div className='flex justify-end gap-4  items-center  h-[50%] '>

                            <img className='h-6' src='/icons/bar/share.svg' />
                            <img className='h-6' src='/icons/bar/edit.svg' />

                        </div>
                    <div className='flex items-center text-5xl font-bold tracking-wider '>{activeNavLink}</div>
                       

                    </div>
                    <div className='lowLevelNavigation flex justify-center '>
                        <div className='bg-white  flex justify-center items-center  h-[45px] w-full '>
                            <div className='bg-background-100 w-[95%] flex justify-center rounded  h-[65%] items-center '>
                                <NavLink to='/' className={({ isActive }) => isActive ? 'w-[15.9%] flex justify-center items-center smallText NavBarActive h-[80%]' : 'relative w-[16.3%] flex justify-center items-center smallText navBar text-black px-3 text-sm  rounded-xl  navBar first:after:w-0 '}>Profile</NavLink>
                                <NavLink to="/log-today" className={({ isActive }) => isActive ? 'w-[15.9%] flex justify-center items-center smallText NavBarActive h-[80%]' : 'relative w-[16.3%] flex justify-center items-center smallText navBar  '}>Log</NavLink>
                                <NavLink to='/progress' className={({ isActive }) => isActive ? 'w-[15.9%] flex justify-center items-center smallText NavBarActive h-[80%]' : 'relative w-[16.3%] flex justify-center items-center smallText navBar  '}>Progress</NavLink>
                                <NavLink to="/friends" className={({ isActive }) => isActive ? 'w-[15.9%] flex justify-center items-center smallText NavBarActive h-[80%]' : 'relative w-[16.3%] flex justify-center items-center smallText navBar  '}>Friends</NavLink>
                                <NavLink to="/settings" className={({ isActive }) => isActive ? 'w-[15.9%] flex justify-center items-center smallText NavBarActive h-[80%]' : 'relative w-[16.3%] flex justify-center items-center smallText navBar  '}>Settings</NavLink>
                            </div>
                        </div>

                    </div>

                </nav>
            </div>
            <Outlet />
        </div>
    )
}
