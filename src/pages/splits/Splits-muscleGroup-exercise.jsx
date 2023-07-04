import React, { useEffect, useState } from 'react'
import { useSplitsState } from '../../contexts/splitContext';
import { useLocation, useParams } from 'react-router-dom';
import AddButton from '../../components/splits/AddButton';
import LogForm from '../../components/log/LogForm';
import { nanoid } from 'nanoid';


export const SplitsMuscleGroupExercise = () => {

  const {setSplits , splits} = useSplitsState()
  const [exercises , setExercises] = useState([])
 


  const location  = useLocation()

  const params = useParams()
  const muscleGroupName = params.mId




  



  const exercsieEl = splits.map(split => {

    	if(split.id === params.id ){

        const exercises = split.muscleGroups[muscleGroupName]

      	return  exercises.map(exercise=>{
          return (

            <div key={nanoid()} className='w-[70%] relative after:absolute after:bg-background-200 after:w-[100%] after:h-[2px] after:bottom-0 after:left-0 my-2 text-xs tracking-wide flex justify-between px-4 pb-1 items-center'>
              {exercise}
              <img src="/icons/remove-grey.svg" alt=""  className='w-4'/>
            </div>
          )
        })
    	}
    })

    // const muscleGroupName = splits.map(split =>{
    //   if(split.id === params.id){
    //     Object.keys(split.muscleGroupName).map(key=>{

    //     })
    //   }
    // })
  





  const [newExercise , setNewExercise] = useState('')
  const [formActive , setIsFormActive] = useState(false)

  function handleAddExercise() {

    setSplits((prev) => {
      const updatedSplits = prev.map((split) => {
        if (split.id === params.id) {
          const existingExercises = split.muscleGroups[muscleGroupName] || [];  // Handle case when muscleGroup doesn't exist initially
  
          const updatedMuscleGroups = {
            ...split.muscleGroups,
            [muscleGroupName]: [...existingExercises, newExercise],
          };
  
          return {
            ...split,
            muscleGroups: updatedMuscleGroups,
          };
        }
        return split;
      });
  
      return updatedSplits;
    });
  }
  
  

  function handleFormActive(){
    setIsFormActive(!formActive)
  }

  return(
    <div className='w-full mt-10  flex flex-col items-center justify-between h-[60vh]'>
      <div className='w-full flex flex-col items-center'>
        <div className='mb-6 bg-background-200 w-3/4 flex justify-center rounded-lg py-1 text-sm font-medium '>
          {muscleGroupName}
        </div>
        <div className='w-full flex flex-col items-center mb-8'>{exercsieEl}</div>
      </div>
      <AddButton
        btnName='Exercise'
        handleFormActive={handleFormActive}
      />

      <LogForm
          title='exercises'
          onSubmit={e=>{
            e.preventDefault()
            handleAddExercise(e)
          }}
          onCancel={handleFormActive}
          inputLabel=''
          inputPlaceholder=''
          inputValue={newExercise}
          setInputValue={setNewExercise}
          isFormActive={formActive}
      
      
      />
    </div>

  )
}

// const A0LxTKu6ZFlBReVVXNwu = {
//     isActive:true,
//     muscleGroups:{
//         back:[
//             'latpulldown',
//             'Barbell rows',

//         ],
//         chest:[
//             'benchpress',
//             'flies'
//         ]

        
//     }

// }