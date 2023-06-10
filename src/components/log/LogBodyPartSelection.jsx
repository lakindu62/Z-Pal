import React from 'react'
import { getDate } from '../../utils'

export default function LogBodyPartSelection({handleCheckboxChange ,handleIsBodypartsSelected}) {
  return (
    <div className='bg-background-100 flex flex-col items-center gap-6'>
                <div className='flex flex-col items-center gap-3'>
                    <div className='subHeaderText'>What are you training today</div>
                    <div className='flex items-center justify-center px-2 h-[27px] bg-[#F6F6F6] rounded-2xl gap-3 '>
                        <img src="/icons/calender.svg" alt="" />
                        <span className=''>{getDate()}</span>
                    </div>
                </div>

                <div className='w-3/4 h-[375px] bg-white rounded-3xl flex items-center justify-center '>
                    <form className='flex flex-col items-center gap-3 
                    'onSubmit={e=>{
                        e.preventDefault()
                    }}>
                        <label className='flex gap-4 w-full'>
                            <input
                                type="checkbox"
                                className="ui-checkbox"
                                value='Chest'
                                onChange={handleCheckboxChange}
                            />
                            Chest
                        </label>
                        <label className='flex gap-4 w-full'>
                            <input
                                type="checkbox"
                                className="ui-checkbox"
                                value='Shoulders'
                                onChange={handleCheckboxChange}
                            />
                            Shoulders
                        </label>
                        <label className='flex gap-4 w-full'>
                            <input
                                type="checkbox"
                                className="ui-checkbox"
                                value='Triceps'
                                onChange={handleCheckboxChange}
                            />
                            Triceps
                        </label>
                        <label className='flex gap-4 w-full'>
                            <input
                                type="checkbox"
                                className="ui-checkbox"
                                value='Legs'
                                onChange={handleCheckboxChange}
                            />
                            Legs
                        </label>
                        <label className='flex gap-4 w-full'>
                            <input
                                type="checkbox"
                                className="ui-checkbox"
                                value='Back'
                                onChange={handleCheckboxChange}
                            />
                            Back
                        </label>
                        <label className='flex gap-4 w-full'>
                            <input
                                type="checkbox"
                                className="ui-checkbox"
                                value='Biceps'
                                onChange={handleCheckboxChange}
                            />
                            Biceps
                        </label>

                        <button onClick={handleIsBodypartsSelected} className='mt-10 bg-iphoneBlue-100 text-white px-5 py-2 rounded-xl'>Start Log</button>
                    </form>

                </div>
                <button></button>

            </div>
  )
}
