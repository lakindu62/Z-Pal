import React, { useState } from 'react'
import { nanoid } from 'nanoid';



import LogBodyPartSelection from '../../components/log/LogBodyPartSelection'
import LogExercise from '../../components/log/LogExercise';
import LogSet from '../../components/log/LogSet';
import DisplayLog from '../../components/log/DisplayLog';

import { getDate } from '../../utils';

export default function () {


    const [log, setLog] = useState({
        Chest: {
            bench: [
                {
                    set: 1,
                    rep: '2',
                    weight: '2'
                }
            ]
        },
        Bench: {
            bench: [
                {
                    set: 1,
                    rep: '2',
                    weight: '2'
                }
            ],
            flies: [
                {
                    set: 1,
                    rep: '2',
                    weight: '2'
                }
            ]
        },
        Biceps: {
            bench: [
                {
                    set: 1,
                    rep: '2',
                    weight: '2'
                }
            ]
        },
        Bench: {
            bench: [
                {
                    set: 1,
                    rep: '2',
                    weight: '2'
                }
            ],
            flies: [
                {
                    set: 1,
                    rep: '2',
                    weight: '2'
                }
            ]
        }
    });
    const [isBodypartsSelected, setIsBodypartsSelected] = useState(false)
    const [isAddExerciseActive, setIsAddExerciseActive] = useState(false)
    const [isSetActive, setIsSetActive] = useState(false)

    const [selectedBodyPart, setSelectedBodyPart] = useState("")
    const [selectedExercise, setSelectedExercise] = useState("")


    const [exerciseInput, setExerciseInput] = useState("")

    const [setInput, setSetInput] = useState({ reps: '', weight: '' })





    // Function to handle checkbox change
    function handleCheckboxChange(e) {
        const checkboxValue = e.target.value
        setLog(prevLog => {
            if (e.target.checked) {
                return {
                    ...prevLog,
                    [checkboxValue]: {

                    }




                }
            } else {
                const { [checkboxValue]: removedProperty, ...updatedDictionary } = prevLog
                return updatedDictionary
            }
        })
    }


    function addExercise(bodyPart, exercise) {
        setLog(prevLog => {


            const updatedExercisesObj = { ...prevLog[bodyPart], [exercise]: [] }


            return {
                ...prevLog,
                [bodyPart]: updatedExercisesObj
            }


        }

        )
    }




    function handleAddSet(currentBodyPart, selectedExercise, setInput) {
        setLog((prevLog) => {
            return {
                ...prevLog,
                [currentBodyPart]: {
                    ...prevLog[currentBodyPart],
                    [selectedExercise]: [
                        ...prevLog[currentBodyPart][selectedExercise],
                        {
                            set: prevLog[currentBodyPart][selectedExercise].length + 1,
                            rep: setInput.reps,
                            weight: setInput.weight
                        }
                    ]
                }
            };
        });
    }



    console.log(log)



    function handleIsBodypartsSelected() {
        setIsBodypartsSelected(!isBodypartsSelected)
    }
    function handleisAddExerciseActive(bodyPart) {
        setIsAddExerciseActive(!isAddExerciseActive)
        setSelectedBodyPart(bodyPart)
    }

    function handleIsSetActive(selectedBodyPart, selectedExercise) {

        console.log('selectedBodyPart:', selectedBodyPart);
        console.log('selectedExercise:', selectedExercise);


        setIsSetActive(!isSetActive)
        setIsAddExerciseActive(false)
        setSelectedBodyPart(selectedBodyPart)
        setSelectedExercise(selectedExercise)
    }


    function closeAddExercise() {
        setIsAddExerciseActive(!isAddExerciseActive)

    }




    function closeAddSet() {
        setIsSetActive(!isSetActive)
    }






    function handleRepsChange(e) {
        setSetInput(prevSet => ({
            ...prevSet,
            reps: e.target.value
        }));
    }

    function handleWeightChange(e) {
        setSetInput(prevSet => ({
            ...prevSet,
            weight: e.target.value
        }));
    }




    const loggedBodyPartsElement = Object.entries(log).map(([bodyPartKey, value]) => {
        return <div className='w-full flex justify-center items-center flex-col mt-4 '>
            <div className='w-3/4 h-[50px] bg-white flex justify-between items-center px-5 shadow-md rounded-3xl text-lg'>
                <span>{bodyPartKey}</span>
                <img onClick={() => handleisAddExerciseActive(bodyPartKey)} src="public/icons/add-black.svg" alt="" />
            </div>

            {Object.entries(value).map(([exercise, exerciseValue]) => {
                return <div className=' w-full flex justify-center items-center flex-col'>
                    <div onClick={() => handleIsSetActive(bodyPartKey, exercise)}  className='flex items-center justify-center  gap-6 px-14 h-[40px] w-[50%] mt-4  bg-background-200  shadow-inner text-slate-600  rounded-3xl  '>
                        {exercise}
                        <img src="public/icons/add-grey.svg" alt="" />
                    </div>
                    <div className=' flex flex-col justify-center '>
                        {exerciseValue.map(setObj => {
                            return (
                                <div className=''>
                                    <div className='flex gap-10 mt-3 text-slate-500 text-xs'>
                                        <div className='flex justify-between gap-3 min-w-min '>
                                            <div className='flex gap-2'><span>Set 0{setObj.set}</span><span>::</span></div>
                                            <div className='flex gap-3 rounded-lg shadow-inner'>
                                                <span>Reps {setObj.rep}</span>
                                                <span>|</span>
                                                <span>Weight {setObj.weight}kg</span>
                                            </div>
                                        </div>
                                        <img src="/icons/remove-grey.svg" alt="" />

                                    </div>
                                    <span className='h-0.5 w-full mt-1 bg-background-200 block'></span>
                                </div>
                            )
                        })}
                    </div>
                </div>



            })}
        </div>
    })

    // const loggedBodyParts = Object.keys(log)
    // const loggedBodyPartsElement = loggedBodyParts.map(bodyPart => {
    //     return (
    //         <div className='w-full flex justify-center items-center flex-col'>
    //             <div className='w-3/4 h-[50px] bg-white flex justify-between items-center px-5 shadow-md rounded-3xl'>
    //                 <span>{bodyPart}</span>
    //                 <img onClick={() => handleisAddExerciseActive(bodyPart)} src="public/icons/add-black.svg" alt="" />
    //             </div>
    //           
    //             {Object.keys(log[bodyPart]).map(excercise => {
    //                 return Object.keys(excercise).map(exercise => {
    //                     return (<div onClick={() => handleIsSetActive(bodyPart, exercise)} className=' min-w-[50%] mt-2 h-[40px] bg-white text-slate-500 flex justify-between gap-5 rounded-3xl items-center px-14'>
    //                         {exercise}
    //                         <img src="public/icons/add-grey.svg" alt="" />

    //                     </div>)
    //                 })
    //             })}
    //         </div>

    //     )
    // })








    return (

        isBodypartsSelected ?

            <LogBodyPartSelection
                handleCheckboxChange={handleCheckboxChange}
                handleIsBodypartsSelected={handleIsBodypartsSelected}
            />

            :

            <div className='relative bg-background-100'>
                <DisplayLog
                    loggedBodyPartsElement={loggedBodyPartsElement}
                />
                <div className='w-full flex justify-center mt-5 pb-5 bg-background-100'>
                <button className='mt-10 bg-iphoneBlue-100 text-white px-5 py-1 rounded-xl'>Finish Log</button>
                </div>
                <LogExercise
                    bodyPart={selectedBodyPart}
                    exerciseInput={exerciseInput}
                    setExerciseInput={setExerciseInput}
                    addExercise={addExercise}
                    closeAddExercise={closeAddExercise}
                    isAddExerciseActive={isAddExerciseActive}
                />
                <LogSet
                    setInput={setInput}
                    handleRepsChange={handleRepsChange}
                    handleWeightChange={handleWeightChange}
                    closeAddSet={closeAddSet}
                    isSetActive={isSetActive}
                    addSet={handleAddSet}
                    bodyPart={selectedBodyPart}
                    selectedExercise={selectedExercise}
                    setSetInput={setSetInput}
                    handleIsSetActive={handleIsSetActive}
                />
                

            </div>
    )
}
