import React from 'react'
import { getDate } from '../../utils'
export default function DisplayLog({loggedBodyPartsElement , dateFromLocation}) {
    
    return(
        <div className='w-full  py-2'>
            <div className='flex flex-col items-center gap-3 w-full mb-10'>
                <div className='subHeaderText'>Log Sets</div>
                <div className='flex items-center justify-center px-2 h-[27px] bg-[#F6F6F6] rounded-2xl gap-3 '>
                    <img src="/icons/calender.svg" alt="" />
                    <span>{ dateFromLocation ? dateFromLocation :  getDate()}</span>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center w-full gap-3 '>
                {loggedBodyPartsElement}
            </div>
            
        </div>
    )
}
