import React , {useState} from 'react'
import { Link } from 'react-router-dom'
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
                            <div className='bg-background-100 w-[80%] flex justify-center rounded  h-[65%] '>
                                <Link to='/' className='w-[19.9%] flex justify-center items-center smallText '>Profile</Link>
                                <Link to="/log-today" className='w-[19.9%] flex justify-center items-center smallText '>Log</Link>
                                <Link to='/progress' className='w-[19.9%] flex justify-center items-center smallText '>Progress</Link>
                                <Link className='w-[19.9%] flex justify-center items-center smallText '>Friends</Link>
                                <Link className='w-[19.9%] flex justify-center items-center smallText '>Settings</Link>
                            </div>
                        </div>
            
                    </div>
           
                </nav>
            </div>
            <Outlet />
        </div>
    )
}
