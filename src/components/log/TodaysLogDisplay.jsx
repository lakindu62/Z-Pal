import React , {useState} from 'react'
import { nanoid } from 'nanoid'

import { db } from '../../firebase'
import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

export default function TodaysLog({ path }) {

    const query = collection(db, path)

    const [docs, loading, error] = useCollectionData(query)

    docs?.map(doc => {
        Object.entries(doc).map(([key, value]) => {
            console.log("key", key)
            console.log("value", value)
        })

    })



    




    return (

        <div></div>
        // <div>
        //     {loading && <div>loading</div>}

        //     <div>
        //         {docs?.map((doc) =>
        //             Object.entries(doc).map(([bodyPart, bodyPartValue]) => {
        //                 return (
        //                     <div key={nanoid()} className='w-full bg-black '>
        //                         <div className='w-3/4 h-[50px] bg-white flex justify-between items-center px-5 shadow-md rounded-3xl text-lg'>
        //                             <span>{bodyPart}</span>
        //                             <img onClick={() => handleisAddExerciseActive(bodyPartKey)} src="/icons/add-black.svg" alt="" />
        //                         </div>

        //                         {Object.entries(bodyPartValue).map(([exercise, exerciseValue]) => {
        //                             return (
        //                                 <div key={nanoid()} className='w-full '>
        //                                     <div onClick={() => handleIsSetActive(bodyPartKey, exercise)} className='flex items-center justify-center gap-6 px-14 h-[40px] w-[50%] mt-4 bg-background-200 shadow-inner text-slate-600 rounded-3xl'>
        //                                         {exercise}
        //                                         <img src="/icons/add-grey.svg" alt="" />
        //                                     </div>
        //                                     <div className='flex flex-col justify-center'>
        //                                         {exerciseValue.map((setObj) => {
        //                                             return (
        //                                                 <div key={nanoid()}>
        //                                                     <div className='flex gap-10 mt-3 text-slate-500 text-xs'>
        //                                                         <div className='flex justify-between gap-3 min-w-min'>
        //                                                             <div className='flex gap-2'>
        //                                                                 <span>Set 0{setObj.set}</span>
        //                                                                 <span>::</span>
        //                                                             </div>
        //                                                             <div className='flex gap-3 rounded-lg shadow-inner'>
        //                                                                 <span>Reps {setObj.rep}</span>
        //                                                                 <span>|</span>
        //                                                                 <span>Weight {setObj.weight}kg</span>
        //                                                             </div>
        //                                                         </div>
        //                                                         <img src="/icons/remove-grey.svg" alt="" />
        //                                                     </div>
        //                                                     <span className='h-0.5 w-full mt-1 bg-background-200 block'></span>
        //                                                 </div>
        //                                             );
        //                                         })}
        //                                     </div>
        //                                 </div>
        //                             );
        //                         })}
        //                     </div>
        //                 );
        //             })
        //         )}
        //     </div>
        // </div>
    );


}
